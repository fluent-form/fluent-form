import { createComponent, EnvironmentInjector, inject, Injectable, PendingTasks, TemplateRef } from '@angular/core';
import { throwWidgetNotFoundError } from '../errors';
import { WIDGET_MAP } from '../tokens';

declare const ngDevMode: boolean | undefined;

@Injectable({ providedIn: 'root' })
export class WidgetTemplateRegistry extends Map<string, Promise<TemplateRef<unknown>>> {
  private readonly envInjector = inject(EnvironmentInjector);
  private readonly widgetMap = inject(WIDGET_MAP);
  private readonly pendingTasks = inject(PendingTasks);

  override get(kind: string): Promise<TemplateRef<unknown>> {
    return super.get(kind) ?? this.register(kind);
  }

  register(kind: string) {
    const component = this.widgetMap.get(kind);

    if (typeof ngDevMode !== 'undefined' && ngDevMode && !component) {
      throwWidgetNotFoundError(kind);
    }

    const completeTask = this.pendingTasks.add();
    const tmpl = (async () => {
      try {
        const comp = await component!();
        const { instance } = createComponent(comp, {
          environmentInjector: this.envInjector
        });
        return instance.templateRef;
      } finally {
        completeTask();
      }
    })();

    this.set(kind, tmpl);
    return tmpl;
  }
}
