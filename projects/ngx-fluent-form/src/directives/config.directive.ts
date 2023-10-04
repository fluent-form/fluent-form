import { Directive, inject } from '@angular/core';
import { DEFAULT_CONFIG, FluentConfig } from '../config';
import { CONFIG } from '../tokens';

@Directive({
  // eslint-disable-next-line
  selector: 'nz-row',
  standalone: true,
  exportAs: 'fluentConfig'
})
export class FluentConfigDirective implements FluentConfig {
  protected config = inject(CONFIG, { optional: true }) ?? DEFAULT_CONFIG;

  get layout() { return this.config.layout; }
  get colon() { return this.config.colon; }
  get gutter() { return this.config.gutter; }
}
