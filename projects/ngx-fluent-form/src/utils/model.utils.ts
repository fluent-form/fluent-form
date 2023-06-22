import { inject, Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { AnyArray, AnyObject } from '@ngify/types';
import { AnySchema, StandardSchema } from '../schemas';
import { FormUtil } from './form.utils';
import { SchemaUtil } from './schema.utils';
import { ValueUtil } from './value.utils';

@Injectable({
  providedIn: 'root'
})
export class ModelUtil {
  private readonly schemaUtil = inject(SchemaUtil);
  private readonly valueUtil = inject(ValueUtil);
  private readonly formUtil = inject(FormUtil);

  updateForm(form: FormGroup, model: AnyObject, schemas: StandardSchema<AnySchema>[], emitEvent?: boolean): FormGroup;
  updateForm(form: FormArray, model: AnyArray, schemas: StandardSchema<AnySchema>[], emitEvent?: boolean): FormArray;
  updateForm(form: FormGroup | FormArray, model: AnyObject, schemas: StandardSchema<AnySchema>[], emitEvent = true): FormGroup | FormArray {
    schemas.forEach(schema => {
      // 这些图示不包含控件图示，直接跳过
      if (this.schemaUtil.isNonControlSchema(schema)) return;

      if (schema.kind === 'group') {
        const key = schema.key!;
        const formGroup = form.get([key]) as FormGroup;
        this.updateForm(formGroup, model[key] ??= {}, schema.schemas, false);
        return;
      }

      if (schema.kind === 'array') {
        const key = schema.key!;
        const array: AnyArray = model[key] ??= [];
        const formArray = form.get([key]) as FormArray;

        if (array.length === formArray.length) {
          const [elementSchema] = this.schemaUtil.filterControlSchemas(schema.schemas);
          const elementSchemas = array.map((_, index) => ({ ...elementSchema, key: index }));

          this.updateForm(formArray, array, elementSchemas, false);
        } else {
          const controls = this.formUtil.createFormArrayElements(schema.schemas, array);

          formArray.clear({ emitEvent: false });

          for (const control of controls) {
            formArray.push(control, { emitEvent: false });
          }
        }
        return;
      }

      if (this.schemaUtil.isComponentContainerSchema(schema) || this.schemaUtil.isControlWrapperSchema(schema)) {
        this.updateForm(form as FormGroup, model, schema.schemas, false);
        return;
      }

      const key = schema.key!.toString();
      const value = this.valueUtil.valueOfModel(model, schema);

      form.get([key])!.setValue(value, { emitEvent: false });
    });

    emitEvent && form.updateValueAndValidity();

    return form;
  }

}
