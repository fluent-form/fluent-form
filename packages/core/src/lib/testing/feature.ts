import { Provider } from '@angular/core';
import { SafeAny } from '@ngify/types';
import { FluentFormFeatureKind, FluentFormWidgetFeature, makeFluentFeature, provideSchemas, provideWidgets } from '../features';
import { provideSchemaPatcher } from '../patcher';
import { FLUENT_FORM_CONTENT, FLUENT_FORM_ITEM_CONTENT } from '../tokens';
import { FormContentComponent, FormItemContentComponent } from './components';

export function withTestingUI(widgets: (FluentFormWidgetFeature<SafeAny> | FluentFormWidgetFeature<SafeAny>[])[]) {
  const flattenedWidgets = widgets.flat();

  return makeFluentFeature(FluentFormFeatureKind.UIAdapter, [
    {
      provide: FLUENT_FORM_CONTENT,
      useValue: FormContentComponent
    },
    {
      provide: FLUENT_FORM_ITEM_CONTENT,
      useValue: FormItemContentComponent
    },
    provideWidgets(flattenedWidgets),
    provideSchemas(flattenedWidgets),
    // 组件内置的 patcher
    flattenedWidgets.filter(feature => feature.patch).map<Provider>(feature =>
      provideSchemaPatcher({
        selector: feature.kind,
        patch: feature.patch!
      })
    )
  ]);
}
