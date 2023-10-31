import { Directive, inject } from '@angular/core';
import { CONFIG, FluentConfig } from '../config';

/**
 * @internal
 */
@Directive({
  // eslint-disable-next-line
  selector: 'nz-row',
  standalone: true,
  exportAs: 'fluentConfig'
})
export class FluentConfigDirective implements FluentConfig {
  protected config = inject(CONFIG);

  get layout() { return this.config.layout; }
  get colon() { return this.config.colon; }
  get gutter() { return this.config.gutter; }
}
