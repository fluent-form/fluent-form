import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'ng-template[fluentWithContextGuard]',
  standalone: true
})
export class FluentWithContextGuardDirective<T> {
  @Input() fluentWithContextGuard!: T;

  static ngTemplateContextGuard<T>(_: FluentWithContextGuardDirective<T>, context: unknown): context is T {
    return true;
  }

}