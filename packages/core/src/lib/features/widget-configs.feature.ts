import { Provider, Type } from '@angular/core';
import { SafeAny } from '@ngify/types';
import { SchemaConfig } from '../interfaces';
import { SchemaPatchFn, provideSchemaPatcher } from '../patcher';
import { AbstractSchema } from '../schemas';
import { SchemaKind, SchemaType } from '../schemas/interfaces';
import { SCHEMA_MAP, WIDGET_MAP } from '../tokens';
import { AbstractWidget, useRowWidget } from '../widgets';

export interface FluentFormWidgetConfig<S extends AbstractSchema> extends SchemaConfig<S> {
  kind: S['kind'];
  widget?: Type<AbstractWidget<unknown>>;
  /** 修补图示，标准化图示时调用 */
  patch?: SchemaPatchFn<S>;
}

export function provideWidgetConfigs(configs: (FluentFormWidgetConfig<SafeAny> | FluentFormWidgetConfig<SafeAny>[])[]): Provider[] {
  const _configs = configs.flat();
  // 添加内置 widgets
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

        // 添加内置的 schema
        map.set(SchemaKind.Headless, { type: SchemaType.Control });
        map.set(SchemaKind.Headful, { type: SchemaType.Control });
        map.set(SchemaKind.Template, { type: SchemaType.Component });

        return map;
      }
    },
    // 组件内置的 patcher
    _configs.filter(config => config.patch).map<Provider>(config =>
      provideSchemaPatcher({
        selector: config.kind,
        patch: config.patch!
      })
    ),
  ];
}
