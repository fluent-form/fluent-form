import { FormArray, FormGroup } from '@angular/forms';
import { AnyArray, AnyObject } from '@ngify/types';
import { AnySchema } from '../schemas';
import { StandardSchema } from '../schemas/types';
import { isComponentContainerSchema, isControlContainerSchema, isControlWrapperSchema, isNonControlSchema } from './schema.utils';
import { valueUtils } from './value.utils';

export function modelUtils<M extends AnyArray | AnyObject>(model: M, schemas: StandardSchema<AnySchema>[]) {
  return new ModelUtils(model, schemas);
}

export class ModelUtils<M extends AnyArray | AnyObject> {
  constructor(
    private readonly model: M,
    private readonly schemas: StandardSchema<AnySchema>[],
  ) { }

  /**
   * 将模型的值赋值到表单
   * @param form
   * @param emitEvent 是否发射事件，函数内部递归调用的时候将置为false，保证只会触发一次事件
   * @returns form
   */
  assign<F extends (M extends AnyArray ? FormArray : FormGroup)>(form: F, emitEvent = true): F {
    this.schemas.forEach(schema => {
      // 这些图示不包含控件图示，直接跳过
      if (isNonControlSchema(schema)) return;

      if (schema.kind === 'group') {
        modelUtils(
          (this.model[schema.name as keyof M] ??= {} as M[keyof M]) as AnyObject,
          schema.schemas
        ).assign(form.get([schema.name!]) as FormGroup, false);
        return;
      }

      if (schema.kind === 'array') {
        modelUtils(
          (this.model[schema.name as keyof M] ??= [] as M[keyof M]) as AnyArray,
          schema.schemas
        ).assign(form.get([schema.name!]) as FormArray, false);
        return;
      }

      if (isControlContainerSchema(schema) || isComponentContainerSchema(schema) || isControlWrapperSchema(schema)) {
        modelUtils(this.model as AnyObject, schema.schemas).assign(form as FormGroup, false);
        return;
      }

      const value = valueUtils(this.model, schema).getValue();

      form.get([schema.name!.toString()])!.setValue(value, { emitEvent: false });
    });

    emitEvent && form.updateValueAndValidity();

    return form;
  }
}
