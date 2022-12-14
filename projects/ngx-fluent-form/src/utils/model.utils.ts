import { UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { AnySchema } from '../schemas';
import { AnyArray, AnyObject } from '../types';
import { isComponentContainerSchema, isComponentSchema, isControlContainerSchema } from './schema.utils';
import { valueUtils } from './value.utils';

export function modelUtils<M extends AnyArray | AnyObject>(model: M, schemas: AnySchema[]) {
  return new ModelUtils(model, schemas);
}

export class ModelUtils<M extends AnyArray | AnyObject> {
  constructor(
    private readonly model: M,
    private readonly schemas: AnySchema[],
  ) { }

  /**
   * 将模型的值赋值到表单
   * @param form
   * @param emitEvent 是否发射事件，函数内部递归调用的时候将置为false，保证只会触发一次事件
   * @returns form
   */
  assign<F extends (M extends AnyArray ? UntypedFormArray : UntypedFormGroup)>(form: F, emitEvent = true): F {
    this.schemas.forEach(schema => {
      // 这些图示不包含控件图示，直接跳过
      if (isComponentSchema(schema) || isComponentContainerSchema(schema)) { return; }

      if (schema.type === 'group') {
        modelUtils(
          (this.model[schema.name as keyof M] ??= {} as M[keyof M]) as AnyObject,
          schema.schemas as AnySchema[]
        ).assign(form.get([schema.name!]) as UntypedFormGroup, false);
        return;
      }

      if (schema.type === 'array') {
        modelUtils(
          (this.model[schema.name as keyof M] ??= [] as M[keyof M]) as AnyArray,
          schema.schemas as AnySchema[]
        ).assign(form.get([schema.name!]) as UntypedFormArray, false);
        return;
      }

      if (isControlContainerSchema(schema)) {
        modelUtils(this.model as AnyObject, schema.schemas as AnySchema[]).assign(form as UntypedFormGroup, false);
        return;
      }

      const value = valueUtils(this.model, schema).getValue();

      form.get([schema.name!.toString()])!.setValue(value, { emitEvent: false });
    });

    emitEvent && form.updateValueAndValidity();

    return form;
  }
}