import { createComponent, EnvironmentInjector, inject, Injectable, TemplateRef } from '@angular/core';
import { WidgetKind } from '../enumerations';
import { WIDGET_MAP } from '../tokens';

@Injectable({
  providedIn: 'root'
})
export class WidgetRepository extends Map<WidgetKind, TemplateRef<unknown>> {
  private readonly environmentInjector = inject(EnvironmentInjector);
  private readonly widgetMap = inject(WIDGET_MAP);

  override get(type: WidgetKind): TemplateRef<unknown> {
    return super.get(type) ?? this.register(type);
  }

  private register(type: WidgetKind) {
    const { instance } = createComponent(this.widgetMap.get(type)!, {
      environmentInjector: this.environmentInjector
    });

    this.set(type, instance.templateRef);

    return instance.templateRef;
  }
}
