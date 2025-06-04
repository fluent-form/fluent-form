import { Pipe, type PipeTransform } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import type { SchemaKey } from '../schemas';
import { getChildControl, isUndefined } from '../utils';

/**
 * @internal
 */
@Pipe({
  name: 'control',
  standalone: true
})
export class FluentControlPipe implements PipeTransform {
  /**
   * Use value as a key to get the instance from the form.
   * @param value
   * @param form
   * @param type Used to overload the method's return type.
   */
  transform(value: SchemaKey | undefined, form: FormGroup | FormArray, type: 'control'): FormControl;
  transform(value: SchemaKey | undefined, form: FormGroup | FormArray, type: 'group'): FormGroup;
  transform(value: SchemaKey | undefined, form: FormGroup | FormArray, type: 'array'): FormArray;
  transform(value: SchemaKey | undefined, form: FormGroup | FormArray): AbstractControl;
  transform(value: SchemaKey | undefined, form: FormGroup | FormArray): AbstractControl {
    if (isUndefined(value)) return form;

    return getChildControl(form, value) ?? form;
    // When the corresponding control instance cannot be found, it usually
    // means the current schema is not a control schema.
    // In this case, return the parent form instance directly ☝️
  }
}
