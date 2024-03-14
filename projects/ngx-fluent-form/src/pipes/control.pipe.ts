import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { SchemaKey } from '../schemas';
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
   * 将 value 作为 key，获取 form 中的实例
   * @param value
   * @param form
   * @param type 用来重载方法的返回值
   */
  transform(value: SchemaKey | undefined, form: FormGroup | FormArray, type: 'control'): FormControl;
  transform(value: SchemaKey | undefined, form: FormGroup | FormArray, type: 'group'): FormGroup;
  transform(value: SchemaKey | undefined, form: FormGroup | FormArray, type: 'array'): FormArray;
  transform(value: SchemaKey | undefined, form: FormGroup | FormArray): AbstractControl;
  transform(value: SchemaKey | undefined, form: FormGroup | FormArray): AbstractControl {
    if (isUndefined(value)) return form;

    return getChildControl(form, value) ?? form;
    // 当获取不到对应的控件实例时，通常说明当前的 schema 不是一个 control schema，这里直接返回父级表单实例☝️
  }

}
