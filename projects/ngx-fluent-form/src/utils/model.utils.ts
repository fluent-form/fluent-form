import { inject, Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { AnySchema, StandardSchema } from '../schemas';
import { Model } from '../types';
import { SchemaUtil } from './schema.utils';
import { ValueUtil } from './value.utils';

@Injectable({
  providedIn: 'root'
})
export class ModelUtil {
  private readonly schemaUtil = inject(SchemaUtil);
  private readonly valueUtil = inject(ValueUtil);

  /**
   * 将模型的值赋值到表单
   * @param form
   * @param emitEvent 是否发射事件，函数内部递归调用的时候将置为false，保证只会触发一次事件
   * @returns form
   */
  updateForm<F extends FormGroup | FormArray, M extends Model<F>>(model: M, schemas: StandardSchema<AnySchema>[], form: F, emitEvent = true): F {
    schemas.forEach(schema => {
      // 这些图示不包含控件图示，直接跳过
      if (this.schemaUtil.isNonControlSchema(schema)) return;

      if (schema.kind === 'group') {
        this.updateForm(
          (model[schema.key as keyof M] ??= {} as M[keyof M]) as Model<FormGroup>,
          schema.schemas,
          form.get([schema.key!]) as FormGroup,
          false
        );
        return;
      }

      if (schema.kind === 'array') {
        this.updateForm(
          (model[schema.key as keyof M] ??= [] as M[keyof M]) as Model<FormArray>,
          schema.schemas,
          form.get([schema.key!]) as FormArray,
          false
        );
        return;
      }

      if (this.schemaUtil.isComponentContainerSchema(schema) || this.schemaUtil.isControlWrapperSchema(schema)) {
        this.updateForm(model, schema.schemas, form, false);
        return;
      }

      const value = this.valueUtil.valueOfModel(model, schema);

      form.get([schema.key!.toString()])!.setValue(value, { emitEvent: false });
    });

    emitEvent && form.updateValueAndValidity();

    return form;
  }
}
