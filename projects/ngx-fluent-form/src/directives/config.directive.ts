import { Directive, inject } from '@angular/core';
import { FluentConfig } from '../config';
import { CONFIG } from '../tokens';

@Directive({
  // eslint-disable-next-line
  selector: 'nz-steps, nz-tabset, nz-row[nz-form]',
  standalone: true,
  exportAs: 'fluentConfig'
})
export class FluentConfigDirective implements FluentConfig {
  protected config = inject(CONFIG);

  get layout() { return this.config.layout; }
  get colon() { return this.config.colon; }
  get gutter() { return this.config.gutter; }
}
