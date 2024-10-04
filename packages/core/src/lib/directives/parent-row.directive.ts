import { Directive, inject } from '@angular/core';
import { FluentRowDirective } from './grid';

/**
 * @internal
 */
@Directive({
  selector: 'fluent-row',
  standalone: true,
  exportAs: 'fluentParentRow'
})
export class FluentParentRowDirective {
  protected row = inject(FluentRowDirective, { skipSelf: true, optional: true });
  get gap() { return this.row?.gap(); }
}
