import { Directive, Input, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[fluentTemplate]',
  standalone: true
})
export class FluentTemplate {
  @Input('fluentTemplate') name!: string;

  readonly templateRef = inject(TemplateRef);

}

/**
 * @deprecated
 * This will be removed in the next major version. Use {@link FluentTemplate} instead.
 */
export const FluentTemplateDirective = FluentTemplate;
