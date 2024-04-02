import { inject, Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { AnyArray, AnyObject } from '@ngify/types';
import { AbstractSchema } from '../schemas';
import { FormUtil, getChildControl } from './form.utils';
import { SchemaUtil } from './schema.utils';
import { ValueUtil } from './value.utils';

/**
 * @internal
 */
@Injectable({
  providedIn: 'root'
})
export class ModelUtil {
  private readonly schemaUtil = inject(SchemaUtil);
  private readonly valueUtil = inject(ValueUtil);
  private readonly formUtil = inject(FormUtil);

  /**
   * 从 model 赋值到 form
   * @param form
   * @param model
   * @param schemas
   * @param completed
   */
  updateForm(form: FormGroup, model: AnyObject, schemas: AbstractSchema[], completed?: boolean): FormGroup;
  updateForm(form: FormArray, model: AnyArray, schemas: AbstractSchema[], completed?: boolean): FormArray;
  updateForm(form: FormGroup | FormArray, model: AnyObject, schemas: AbstractSchema[], completed = true): FormGroup | FormArray {
    for (const schema of schemas) {
      if (this.schemaUtil.isControlGroup(schema)) {
        const key = schema.key!;
        const formGroup = getChildControl(form, key) as FormGroup;

        this.updateForm(formGroup, model[key] ??= {}, schema.schemas, false);
        continue;
      }

      if (this.schemaUtil.isControlArray(schema)) {
        const key = schema.key!;
        const array: AnyArray = model[key] ??= [];
        const formArray = getChildControl(form, key) as FormArray;

        // 如果模型数组的长度与数组控件长度一致，则原地更新表单值，否则直接重建数组控件
        if (array.length === formArray.length) {
          const [elementSchema] = this.schemaUtil.filterControls(schema.schemas);
          const elementSchemas = array.map((_, index) => ({ ...elementSchema, key: index }));

          this.updateForm(formArray, array, elementSchemas, false);
        } else {
          const controls = this.formUtil.createFormArrayElements(schema.schemas, array);

          formArray.clear({ emitEvent: false });
          for (const control of controls) {
            formArray.push(control, { emitEvent: false });
          }
          formArray.updateValueAndValidity({ onlySelf: true });
        }
        continue;
      }

      if (this.schemaUtil.isComponentContainer(schema) || this.schemaUtil.isControlWrapper(schema)) {
        this.updateForm(form as FormGroup, model, schema.schemas, false);
        continue;
      }

      if (this.schemaUtil.isControl(schema)) {
        const value = this.valueUtil.valueOfModel(model, schema);
        const control = getChildControl(form, schema.key!)!;

        control.setValue(value, { onlySelf: true });
      }
    }

    // 仅在完成全部子更新时，再关闭 onlySelf
    form.updateValueAndValidity({ onlySelf: !completed });

    return form;
  }

}
