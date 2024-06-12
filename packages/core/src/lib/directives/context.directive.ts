import { Directive, inject, Injector, Input, runInInjectionContext, TemplateRef, Type, ViewContainerRef } from '@angular/core';
import { SafeAny } from '@ngify/types';

interface FluentContextContext<T extends Type<SafeAny>> {
  fluentContext: InstanceType<T>;
}

/**
 * @internal
 */
@Directive({
  selector: '[fluentContext]',
  standalone: true
})
export class FluentContextDirective<T extends Type<SafeAny>> {
  private readonly templateRef = inject(TemplateRef<void>);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly injector = inject(Injector);
  private readonly context: FluentContextContext<T> = { fluentContext: null! };

  @Input() set fluentContext(value: T) {
    runInInjectionContext(this.injector, () => {
      this.context.fluentContext = new value();
    });
  }

  constructor() {
    this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);
  }

  static ngTemplateContextGuard<T extends Type<SafeAny>>(_: FluentContextDirective<T>, ctx: unknown): ctx is FluentContextContext<T> {
    return true;
  }

}
