import { Provider } from '@angular/core';
import { FLUENT_FORM_CONTENT, FluentFormFeatureKind, FluentFormWidgetFeature, makeFluentFeature, provideSchemaPatcher, provideSchemas, provideWidgets } from '@fluent-form/core';
import { SafeAny } from '@ngify/types';
import { FormContentComponent } from './components';

export function withZorro(widgets: (FluentFormWidgetFeature<SafeAny> | FluentFormWidgetFeature<SafeAny>[])[]) {
  const flattenedWidgets = widgets.flat();

  return makeFluentFeature(FluentFormFeatureKind.UIAdapter, [
    {
      provide: FLUENT_FORM_CONTENT,
      useValue: FormContentComponent
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
