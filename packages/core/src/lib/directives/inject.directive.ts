import { Directive, inject, Injector, Input, OnChanges, ProviderToken, TemplateRef, ViewContainerRef } from '@angular/core';
import { SafeAny } from '@ngify/types';

type ProviderTokenValue<T> = T extends ProviderToken<infer V> ? V : never;

interface FluentInjectContext<T extends ProviderToken<SafeAny>> {
  fluentInject: ProviderTokenValue<T>;
}

/**
 * @internal
 * ```html
 * <ng-container *fluentInject="token as value"></ng-container>
 * ```
 *
 * @deprecated Use `@let` to replace this directive in v18.1.
 *
 * ```
 * @let value = token | inject: { optional: true }
 * ```
 */
@Directive({
  selector: '[fluentInject]',
  standalone: true
})
export class FluentInjectDirective<T extends ProviderToken<SafeAny>> implements OnChanges {
  private readonly templateRef = inject(TemplateRef);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly injector = inject(Injector);
  private readonly context: FluentInjectContext<T> = { fluentInject: null! };

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

  static ngTemplateContextGuard<T extends ProviderToken<SafeAny>>(_: FluentInjectDirective<T>, ctx: unknown): ctx is FluentInjectContext<T> {
    return true;
  }

}
