import { inject, Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import type { AnyArray, AnyObject } from '@ngify/core';
import type { AbstractSchema } from '../schemas';
import type { Indexable } from '../types';
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
  updateForm(form: FormGroup, model: AnyObject, schemas: Indexable<AbstractSchema>[], completed?: boolean): FormGroup;
  updateForm(form: FormArray, model: AnyArray, schemas: Indexable<AbstractSchema>[], completed?: boolean): FormArray;
  updateForm(form: FormGroup | FormArray, model: AnyObject, schemas: Indexable<AbstractSchema>[], completed = true): FormGroup | FormArray {
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

        // / If the model array length matches the form array length, update the
        // form values in place; otherwise, rebuild the form array.
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

    // Only disable `onlySelf` after all child updates are complete.
    form.updateValueAndValidity({ onlySelf: !completed });

    return form;
  }
}
