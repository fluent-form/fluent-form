import { createComponent, EnvironmentInjector, inject, Injectable, TemplateRef } from '@angular/core';
import { WIDGET_MAP } from '../tokens';

@Injectable({
  providedIn: 'root'
})
export class TemplateRegistry extends Map<string, TemplateRef<unknown>> {
  private readonly environmentInjector = inject(EnvironmentInjector);
  private readonly widgetMap = inject(WIDGET_MAP);

  override get(kind: string): TemplateRef<unknown> {
    return super.get(kind) ?? this.register(kind);
  }

  private register(kind: string) {
    const { instance } = createComponent(this.widgetMap.get(kind)!, {
      environmentInjector: this.environmentInjector
    });

    this.set(kind, instance.templateRef);

    return instance.templateRef;
  }
}
