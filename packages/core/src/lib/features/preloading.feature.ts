import { APP_BOOTSTRAP_LISTENER, ApplicationRef, ComponentRef, inject, Injector } from '@angular/core';
import { WidgetTemplateRegistry } from '../services';
import { SCHEMA_MAP, WIDGET_MAP } from '../tokens';
import { makeFluentFeature } from './helper';
import { FluentFormFeatureKind, type FluentFormFeature } from './interface';

export function withPreloading(): FluentFormFeature<FluentFormFeatureKind.Preload> {
  return makeFluentFeature(
    FluentFormFeatureKind.Preload,
    [
      {
        provide: APP_BOOTSTRAP_LISTENER,
        multi: true,
        useFactory: () => {
          const injector = inject(Injector);
          return (bootstrappedComponentRef: ComponentRef<unknown>) => {
            const ref = injector.get(ApplicationRef);

            if (bootstrappedComponentRef !== ref.components[0]) {
              return;
            }

            const callbackRunner = typeof requestIdleCallback !== 'undefined' ? requestIdleCallback : setTimeout;
            callbackRunner(() => {
              const schemaMap = injector.get(SCHEMA_MAP);
              const widgetMap = injector.get(WIDGET_MAP);
              const widgetTemplateRegistry = injector.get(WidgetTemplateRegistry);
              for (const [kind] of schemaMap.entries()) {
                if (widgetMap.get(kind)) {
                  widgetTemplateRegistry.register(kind);
                }
              }
            });
          };
        }
      }
    ]
  );
}
