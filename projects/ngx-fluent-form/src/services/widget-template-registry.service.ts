import { createComponent, EnvironmentInjector, inject, Injectable, TemplateRef } from '@angular/core';
import { WIDGET_MAP } from '../tokens';

/**
 * @internal
 */
@Injectable({
  providedIn: 'root'
})
export class WidgetTemplateRegistry extends Map<string, TemplateRef<unknown>> {
  private readonly environmentInjector = inject(EnvironmentInjector);
  private readonly widgetMap = inject(WIDGET_MAP);

  override get(kind: string): TemplateRef<unknown> {
    return super.get(kind) ?? this.register(kind);
  }

  private register(kind: string) {
    const component = this.widgetMap.get(kind);

    if (!component) {
      throw new Error(`The '${kind}' template was not found`);
    }

    const { instance } = createComponent(component, {
      environmentInjector: this.environmentInjector
    });

    this.set(kind, instance.templateRef);

    return instance.templateRef;
  }
}
