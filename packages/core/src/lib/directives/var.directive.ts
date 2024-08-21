import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';

interface FluentVarContext<T> {
  fluentVar: T;
}

/**
 * @deprecated Use `@let` to replace this directive in v18.1
 */
@Directive({
  selector: '[fluentVar]',
  standalone: true
})
export class FluentVarDirective<T> {
  private readonly templateRef = inject(TemplateRef);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly context: FluentVarContext<T> = { fluentVar: null! };

  @Input() set fluentVar(value: T) {
    this.context.fluentVar = value;
  }

  constructor() {
    this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);
  }

  static ngTemplateContextGuard<T>(_: FluentVarContext<T>, ctx: unknown): ctx is FluentVarContext<T> {
    return true;
  }
}
