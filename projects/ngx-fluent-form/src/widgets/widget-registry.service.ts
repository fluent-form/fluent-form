import { createComponent, EnvironmentInjector, inject, Injectable, TemplateRef } from '@angular/core';
import { WidgetKind } from '../enumerations';
import { WIDGET_MAP } from '../tokens';

@Injectable({
  providedIn: 'root'
})
export class WidgetRegistry extends Map<WidgetKind, TemplateRef<unknown>> {
  private readonly environmentInjector = inject(EnvironmentInjector);
  private readonly widgetMap = inject(WIDGET_MAP);

  override get(kind: WidgetKind): TemplateRef<unknown> {
    return super.get(kind) ?? this.register(kind);
  }

  private register(kind: WidgetKind) {
    const { instance } = createComponent(this.widgetMap.get(kind)!, {
      environmentInjector: this.environmentInjector
    });

    this.set(kind, instance.templateRef);

    return instance.templateRef;
  }
}
