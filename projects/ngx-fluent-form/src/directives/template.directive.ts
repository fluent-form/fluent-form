import { Directive, Input, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[fluentTemplate]',
  standalone: true
})
export class FluentTemplateDirective {
  @Input('fluentTemplate') name!: string;

  readonly templateRef = inject(TemplateRef);

}
