import type { Provider, Type } from '@angular/core';
import type { SafeAny } from '@ngify/core';
import type { SchemaConfig } from '../interfaces';
import { type SchemaPatchFn, provideSchemaPatcher } from '../patcher';
import type { AbstractSchema } from '../schemas';
import { SchemaKind, SchemaType } from '../schemas/interfaces';
import { SCHEMA_MAP, WIDGET_MAP } from '../tokens';
import { AbstractWidget, useRowWidget } from '../widgets';

interface DefaultExport<T> {
  default: T;
}
type MaybeDefaultExport<T> = T | DefaultExport<T>;

export interface FluentFormWidgetConfig<S extends AbstractSchema> extends SchemaConfig<S> {
  kind: S['kind'];
  widget?: Type<AbstractWidget<unknown>>;
  loadWidget?: () => Promise<MaybeDefaultExport<Type<AbstractWidget<unknown>>>>;
  /** Patch the schema, called when normalizing the schema. */
  patch?: SchemaPatchFn<S>;
}

function isWrappedDefaultExport<T>(value: T | DefaultExport<T>): value is DefaultExport<T> {
  // We use `in` here with a string key `'default'`, because we expect `DefaultExport` objects to be
  // dynamically imported ES modules with a spec-mandated `default` key. Thus we don't expect that
  // `default` will be a renamed property.
  return value && typeof value === 'object' && 'default' in value;
}

function maybeUnwrapDefaultExport<T>(input: T | DefaultExport<T>): T {
  return isWrappedDefaultExport(input) ? input.default : input;
}

export function provideWidgetConfigs(configs: (FluentFormWidgetConfig<SafeAny> | FluentFormWidgetConfig<SafeAny>[])[]): Provider[] {
  const _configs = configs.flat();
  // Add built-in widgets.
  _configs.push(useRowWidget());

  return [
    {
      provide: WIDGET_MAP,
      useFactory: () => {
        const map = new Map<string, () => Promise<Type<AbstractWidget<unknown>>>>(
          _configs.filter(config => config.widget || config.loadWidget).map(feature => [
            feature.kind,
            () => feature.widget
              ? Promise.resolve(feature.widget!)
              : feature.loadWidget!().then(maybeUnwrapDefaultExport)
          ])
        );

        return map;
      }
    },
    {
      provide: SCHEMA_MAP,
      useFactory: () => {
        const map = new Map<string, SchemaConfig<SafeAny>>(
          _configs.map(config => [
            config.kind,
            config
          ])
        );

        // Add built-in schemas.
        map.set(SchemaKind.Headless, { type: SchemaType.Control });
        map.set(SchemaKind.Headful, { type: SchemaType.Control });
        map.set(SchemaKind.Template, { type: SchemaType.Component });

        return map;
      }
    },
    // Component's built-in patcher.
    _configs.filter(config => config.patch).map<Provider>(config =>
      provideSchemaPatcher({
        selector: config.kind,
        patch: config.patch!
      }))
  ];
}
