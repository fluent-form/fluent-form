import { Provider, Type } from '@angular/core';
import { SafeAny } from '@ngify/types';
import { SchemaConfig } from '../interfaces';
import { SchemaPatchFn, provideSchemaPatcher } from '../patcher';
import { AbstractSchema } from '../schemas';
import { SchemaKind, SchemaType } from '../schemas/interfaces';
import { SCHEMA_MAP, WIDGET_MAP } from '../tokens';
import { AbstractWidget } from '../widgets';
import { makeFluentFeature } from './helper';
import { FluentFormFeature, FluentFormFeatureKind } from './interface';

export interface FluentFormWidgetFeature<S extends AbstractSchema> extends SchemaConfig<S> {
  kind: string;
  widget?: Type<AbstractWidget<unknown>>;
  /** 修补图示，标准化图示时调用 */
  patch?: SchemaPatchFn<S>;
}

export function provideWidgets(widgets: FluentFormWidgetFeature<SafeAny>[]): Provider {
  return {
    provide: WIDGET_MAP,
    useFactory: () => {
      const map: Map<string, Type<AbstractWidget<unknown>>> = new Map(
        widgets.filter(feature => feature.widget).map(feature => [
          feature.kind,
          feature.widget!
        ])
      );

      return map;
    }
  };
}

export function provideSchemas(widgets: FluentFormWidgetFeature<SafeAny>[]): Provider {
  return {
    provide: SCHEMA_MAP,
    useFactory: () => {
      const map: Map<string, SchemaConfig<SafeAny>> = new Map(
        widgets.map(feature => [
          feature.kind,
          feature
        ])
      );

      // 添加内置的 schema
      map.set(SchemaKind.Headless, { type: SchemaType.Control });
      map.set(SchemaKind.Template, { type: SchemaType.Component });

      return map;
    }
  };
}

export function withWidgets(features: (FluentFormWidgetFeature<SafeAny> | FluentFormWidgetFeature<SafeAny>[])[]): FluentFormFeature<FluentFormFeatureKind.Widget> {
  const flattenedFeatures = features.flat();

  return makeFluentFeature(FluentFormFeatureKind.Widget, [
    {
      provide: WIDGET_MAP,
      useFactory: () => {
        const map: Map<string, Type<AbstractWidget<unknown>>> = new Map(
          flattenedFeatures.filter(feature => feature.widget).map(feature => [
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
          flattenedFeatures.map(feature => [
            feature.kind,
            feature
          ])
        );

        // 添加内置的 schema
        map.set(SchemaKind.Headless, { type: SchemaType.Control });
        map.set(SchemaKind.Template, { type: SchemaType.Component });

        return map;
      }
    },
    // 组件内置的 patcher
    flattenedFeatures.filter(feature => feature.patch).map<Provider>(feature =>
      provideSchemaPatcher({
        selector: feature.kind,
        patch: feature.patch!
      })
    ),
    // 添加内置的 patcher
    provideSchemaPatcher({
      selector: 'group',
      patch: (schema: SafeAny) => {
        schema.layout ??= 'vertical';
        schema.gap ??= { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 };
        return schema;
      }
    })
  ]);
}
