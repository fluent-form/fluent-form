import { Directive, Injector, Input, TemplateRef, Type, ViewContainerRef, inject } from '@angular/core';
import { SafeAny } from '@ngify/types';

interface FluentContextContext<T extends Type<SafeAny>> {
  fluentContext: InstanceType<T>;
}

@Directive({
  selector: '[fluentContext]',
  standalone: true
})
export class FluentContextDirective<T extends Type<SafeAny>>  {
  private readonly templateRef = inject(TemplateRef<void>);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly injector = inject(Injector);
  private readonly context: FluentContextContext<T> = { fluentContext: null! };

  @Input() set fluentContext(value: T) {
    // TODO: ng16 使用 runInInjectionContext + inject 替代手动传入 injector
    this.context.fluentContext = new value(this.injector);
  }

  constructor() {
    this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);
  }

  static ngTemplateContextGuard<T extends Type<SafeAny>>(_: FluentContextDirective<T>, ctx: unknown): ctx is FluentContextContext<T> {
    return true;
  }

}
