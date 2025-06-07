import { Directive, Input } from '@angular/core';

/**
 * @internal
 */
@Directive({
  selector: 'ng-template[fluentContextGuard]'
})
export class FluentContextGuardDirective<T> {
  @Input() fluentContextGuard!: T;

  /**
   * @internal
   */
  static ngTemplateContextGuard<T>(_: FluentContextGuardDirective<T>, context: unknown): context is T {
    return true;
  }
}
