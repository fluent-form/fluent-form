import { createComponent, EnvironmentInjector, inject, Injectable, TemplateRef } from '@angular/core';
import { WidgetType } from '../enumerations';
import { WIDGET_MAP } from '../tokens';

@Injectable({
  providedIn: 'root'
})
export class WidgetRepository extends Map<WidgetType, TemplateRef<unknown>> {
  private readonly environmentInjector = inject(EnvironmentInjector);
  private readonly widgetMap = inject(WIDGET_MAP);

  override get(type: WidgetType): TemplateRef<unknown> {
    return super.get(type) ?? this.register(type);
  }

  private register(type: WidgetType) {
    const { instance } = createComponent(this.widgetMap.get(type)!, {
      environmentInjector: this.environmentInjector
    });

    this.set(type, instance.templateRef);

    return instance.templateRef;
  }
}
