import { createComponent, EnvironmentInjector, inject, Injectable, TemplateRef } from '@angular/core';
import { throwWidgetNotFoundError } from '../errors';
import { WIDGET_MAP } from '../tokens';

declare const ngDevMode: boolean | undefined;

@Injectable({ providedIn: 'root' })
export class WidgetTemplateRegistry extends Map<string, TemplateRef<unknown>> {
  private readonly envInjector = inject(EnvironmentInjector);
  private readonly map = inject(WIDGET_MAP);

  override get(kind: string): TemplateRef<unknown> {
    return super.get(kind) ?? this.register(kind);
  }

  private register(kind: string) {
    const component = this.map.get(kind);

    if (typeof ngDevMode !== 'undefined' && ngDevMode && !component) {
      throwWidgetNotFoundError(kind);
    }

    const { instance } = createComponent(component!, {
      environmentInjector: this.envInjector
    });

    this.set(kind, instance.templateRef);

    return instance.templateRef;
  }
}
