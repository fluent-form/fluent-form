import { AbstractControl } from '@angular/forms';
import { AnySchema } from '../schemas';
import { Arr, Obj } from '../type';
import { FluentFormNameDirective } from './fluent-form-name.directive';
import { FluentFormDirective } from './fluent-form.directive';

/**
 * 抽象的控件容器
 */
export abstract class ControlContainer<T extends Obj | Arr> {
  protected _schemas!: AnySchema[];
  get schemas(): AnySchema[] {
    return this._schemas;
  }
  set schemas(value: AnySchema[]) {
    this._schemas = value;
  }

  form!: AbstractControl;
  model!: T;

  /** 当前容器的指令 */
  get directive(): FluentFormDirective<T> | FluentFormNameDirective<T> | null {
    return null;
  }

}