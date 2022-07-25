import { Arr, Obj } from '../type';
import { FluentFormNameDirective } from './fluent-form-name.directive';
import { FluentFormDirective } from './fluent-form.directive';

export abstract class ControlContainer {
  get directive(): FluentFormDirective<Obj> | FluentFormNameDirective<Obj | Arr> | null {
    return null;
  }
}