import { Directive, Input } from '@angular/core';

@Directive({
  // eslint-disable-next-line
  selector: 'ng-template[contextType]',
  standalone: true
})
export class FluentTemplateContextTypeDirective<T> {
  @Input() contextType!: T;

  static ngTemplateContextGuard<T>(_: FluentTemplateContextTypeDirective<T>, context: unknown): context is T {
    return true;
  }

}