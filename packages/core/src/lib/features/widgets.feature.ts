import { Provider, Type } from '@angular/core';
import { SafeAny } from '@ngify/types';
import { SchemaConfig } from '../interfaces';
import { SchemaPatchFn } from '../patcher';
import { AbstractSchema } from '../schemas';
import { SchemaKind, SchemaType } from '../schemas/interfaces';
import { SCHEMA_MAP, WIDGET_MAP } from '../tokens';
import { AbstractWidget } from '../widgets';

export interface FluentFormWidgetFeature<S extends AbstractSchema> extends SchemaConfig<S> {
  kind: string;
  widget?: Type<AbstractWidget<unknown>>;
  /** 修补图示，标准化图示时调用 */
  patch?: SchemaPatchFn<S>;
}

export function provideWidgets(widgets: FluentFormWidgetFeature<SafeAny>[]): Provider {
  // TODO
  // 添加内置 widgets
  // flattenedFeatures.push(useRowWidget());

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
