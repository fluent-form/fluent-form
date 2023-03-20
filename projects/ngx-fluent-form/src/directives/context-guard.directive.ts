import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'ng-template[fluentContextGuard]',
  standalone: true
})
export class FluentContextGuardDirective<T> {
  @Input() fluentContextGuard!: T;

  static ngTemplateContextGuard<T>(_: FluentContextGuardDirective<T>, context: unknown): context is T {
    return true;
  }

}
