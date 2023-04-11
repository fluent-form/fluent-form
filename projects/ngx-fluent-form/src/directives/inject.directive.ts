import { Directive, InjectFlags, Injector, Input, OnChanges, ProviderToken, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { SafeAny } from '@ngify/types';

interface FluentInjectContext<T> {
  fluentInject: T;
}

type ProviderTokenValue<T> = T extends ProviderToken<infer V> ? V : never;

/**
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
    // TODO angular15就不需要 InjectFlags 了
    let flags = InjectFlags.Default;

    if (this.fluentInjectHost) {
      flags |= InjectFlags.Host;
    }
    if (this.fluentInjectSelf) {
      flags |= InjectFlags.Self;
    }
    if (this.fluentInjectSkipSelf) {
      flags |= InjectFlags.SkipSelf;
    }
    if (this.fluentInjectOptional) {
      flags |= InjectFlags.Optional;
    }

    this.context.fluentInject = this.injector.get(this.fluentInject, this.fluentInjectDefault, flags);
  }

  static ngTemplateContextGuard<T extends ProviderToken<SafeAny>>(_: FluentInjectDirective<T>, ctx: unknown): ctx is FluentInjectContext<ProviderTokenValue<T>> {
    return true;
  }

}
