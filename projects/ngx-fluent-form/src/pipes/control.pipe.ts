import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { AnySchemaName, SchemaName } from '../schemas';

@Pipe({
  name: 'control'
})
export class ControlPipe implements PipeTransform {

  /**
   * 将 value 作为 key，获取 container 中的实例
   * @param value
   * @param container
   * @param type 用来重载方法的返回值
   */
  transform(value: AnySchemaName, container: FormGroup | FormArray, type: 'control'): FormControl;
  transform(value: AnySchemaName, container: FormGroup | FormArray, type: 'group'): FormGroup;
  transform(value: AnySchemaName, container: FormGroup | FormArray, type: 'array'): FormArray;
  transform(value: AnySchemaName, container: FormGroup | FormArray): AbstractControl;
  transform(value: AnySchemaName, container: FormGroup | FormArray): AbstractControl | null {
    // 关于为什么使用 `AbstractControl.get([name])` 而不是 `AbstractControl.get(name)` ？
    // 由于 NG 没有提供 FormArrayDirective，查阅源码后发现其实 FormGroupDirective 是兼容传入 FormArray 对象的。
    // 需要注意的就是 AbstractControl#get() 方法，由于 FormGroupDirective 原本是为 FormGroup 服务的，
    // 而 FormGroup 的控件名为字符串，AbstractControl#get() 方法的参数自然也只处理字符串类型（调用了 String#split()），
    // 但 FormArray 的控件名为数字，此时如果参数传入的是数字，就会出问题，因此这里将参数一律转为数组来绕开此问题。
    return container.get([Array.isArray(value) ? value.toString() : value as SchemaName]);
  }

}
