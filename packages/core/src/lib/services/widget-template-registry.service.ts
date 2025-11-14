import { createComponent, EnvironmentInjector, inject, Injectable, TemplateRef } from '@angular/core';
import { throwWidgetNotFoundError } from '../errors';
import { WIDGET_MAP } from '../tokens';

declare const ngDevMode: boolean | undefined;

@Injectable({ providedIn: 'root' })
export class WidgetTemplateRegistry extends Map<string, Promise<TemplateRef<unknown>>> {
  private readonly envInjector = inject(EnvironmentInjector);
  private readonly widgetMap = inject(WIDGET_MAP);

  override get(kind: string): Promise<TemplateRef<unknown>> {
    return super.get(kind) ?? this.register(kind);
  }

  private register(kind: string) {
    const component = this.widgetMap.get(kind);

    if (typeof ngDevMode !== 'undefined' && ngDevMode && !component) {
      throwWidgetNotFoundError(kind);
    }

    const tmpl = component!().then(comp => {
      const { instance } = createComponent(comp, {
        environmentInjector: this.envInjector
      });
      return instance.templateRef;
    });

    this.set(kind, tmpl);
    return tmpl;
  }
}
