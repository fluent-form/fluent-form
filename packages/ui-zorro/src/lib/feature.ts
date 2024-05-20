import { Provider } from '@angular/core';
import { FLUENT_FORM_CONTENT, FLUENT_FORM_ITEM_CONTENT, FluentFormFeatureKind, FluentFormWidgetFeature, makeFluentFeature, provideSchemaPatcher, provideSchemas, provideWidgets } from '@fluent-form/core';
import { SafeAny } from '@ngify/types';
import { FluentFormItemContentComponent, FormContentComponent } from './components';

export function withZorro(widgets: (FluentFormWidgetFeature<SafeAny> | FluentFormWidgetFeature<SafeAny>[])[]) {
  const flattenedWidgets = widgets.flat();

  return makeFluentFeature(FluentFormFeatureKind.UIAdapter, [
    {
      provide: FLUENT_FORM_CONTENT,
      useValue: FormContentComponent
    },
    {
      provide: FLUENT_FORM_ITEM_CONTENT,
      useValue: FluentFormItemContentComponent
    },
    provideWidgets(flattenedWidgets),
    provideSchemas(flattenedWidgets),
    // 组件内置的 patcher
    flattenedWidgets.filter(feature => feature.patch).map<Provider>(feature =>
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
