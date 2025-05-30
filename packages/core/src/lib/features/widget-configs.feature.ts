import type { Provider, Type } from '@angular/core';
import type { SafeAny } from '@ngify/types';
import type { SchemaConfig } from '../interfaces';
import { type SchemaPatchFn, provideSchemaPatcher } from '../patcher';
import type { AbstractSchema } from '../schemas';
import { SchemaKind, SchemaType } from '../schemas/interfaces';
import { SCHEMA_MAP, WIDGET_MAP } from '../tokens';
import { AbstractWidget, useRowWidget } from '../widgets';

export interface FluentFormWidgetConfig<S extends AbstractSchema> extends SchemaConfig<S> {
  kind: S['kind'];
  widget?: Type<AbstractWidget<unknown>>;
  /** Patch the schema, called when normalizing the schema. */
  patch?: SchemaPatchFn<S>;
}

export function provideWidgetConfigs(configs: (FluentFormWidgetConfig<SafeAny> | FluentFormWidgetConfig<SafeAny>[])[]): Provider[] {
  const _configs = configs.flat();
  // Add built-in widgets.
  _configs.push(useRowWidget());

  return [
    {
      provide: WIDGET_MAP,
      useFactory: () => {
        const map: Map<string, Type<AbstractWidget<unknown>>> = new Map(
          _configs.filter(config => config.widget).map(feature => [
            feature.kind,
            feature.widget!
          ])
        );

        return map;
      }
    },
    {
      provide: SCHEMA_MAP,
      useFactory: () => {
        const map: Map<string, SchemaConfig<SafeAny>> = new Map(
          _configs.map(config => [
            config.kind,
            config
          ])
        );

        // Add built-in schemas.
        map.set(SchemaKind.Headless, { type: SchemaType.Control });
        map.set(SchemaKind.Headed, { type: SchemaType.Control });
        map.set(SchemaKind.Template, { type: SchemaType.Component });

        return map;
      }
    },
    // Component's built-in patcher.
    _configs.filter(config => config.patch).map<Provider>(config =>
      provideSchemaPatcher({
        selector: config.kind,
        patch: config.patch!
      })
    ),
  ];
}
