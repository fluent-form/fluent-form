import { DestroyRef, Directive, TemplateRef, inject, input, OnInit } from '@angular/core';
import { NAMED_TEMPLATES } from '../tokens';

@Directive({
  selector: '[fluentTemplate]',
  standalone: true
})
export class FluentTemplate implements OnInit {
  private readonly templateRef = inject(TemplateRef);
  private readonly templates = inject(NAMED_TEMPLATES);

  readonly fluentTemplate = input.required<string>();

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.templates.splice(
        this.templates.findIndex(item => item.templateRef === this.templateRef),
        1
      );
    });
  }

  ngOnInit() {
    this.templates.push({
      name: this.fluentTemplate(),
      templateRef: this.templateRef
    });
  }
}

/**
 * @deprecated
 * This will be removed in the next major version. Use {@link FluentTemplate} instead.
 */
export const FluentTemplateDirective = FluentTemplate;
