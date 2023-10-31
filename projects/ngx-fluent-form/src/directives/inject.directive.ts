import { Directive, inject, Injector, Input, OnChanges, ProviderToken, TemplateRef, ViewContainerRef } from '@angular/core';
import { SafeAny } from '@ngify/types';

interface FluentInjectContext<T> {
  fluentInject: T;
}

type ProviderTokenValue<T> = T extends ProviderToken<infer V> ? V : never;

/**
 * @internal
 * ```html
 * <ng-container *fluentInject="token as value"></ng-container>
 * ```
 */
@Directive({
  selector: '[fluentInject]',
  standalone: true
})
export class FluentInjectDirective<T extends ProviderToken<SafeAny>> implements OnChanges {
  private readonly templateRef = inject(TemplateRef<void>);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly injector = inject(Injector);
  private readonly context: FluentInjectContext<ProviderTokenValue<T>> = { fluentInject: null! };

  @Input() fluentInject!: T;
  @Input() fluentInjectDefault?: ProviderTokenValue<T>;
  @Input() fluentInjectHost?: boolean;
  @Input() fluentInjectSelf?: boolean;
  @Input() fluentInjectSkipSelf?: boolean;
  @Input() fluentInjectOptional?: boolean;

  constructor() {
    this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);
  }

  ngOnChanges(): void {
    this.context.fluentInject = this.injector.get(this.fluentInject, this.fluentInjectDefault, {
      host: this.fluentInjectHost,
      self: this.fluentInjectSelf,
      skipSelf: this.fluentInjectSkipSelf,
      optional: this.fluentInjectOptional,
    });
  }

  static ngTemplateContextGuard<T extends ProviderToken<SafeAny>>(_: FluentInjectDirective<T>, ctx: unknown): ctx is FluentInjectContext<ProviderTokenValue<T>> {
    return true;
  }

}
