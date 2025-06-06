import { SafeAny } from '@ngify/core';
import { FluentFormFeatureKind, FluentFormWidgetConfig, makeFluentFeature, provideWidgetConfigs } from '../features';
import { FLUENT_FORM_CONTENT, FLUENT_FORM_ITEM_CONTENT } from '../tokens';
import { FormContentComponent, FormItemContentComponent } from './components';
import { useAllWidgets } from './widgets';

export function withTesting(widgets: (FluentFormWidgetConfig<SafeAny> | FluentFormWidgetConfig<SafeAny>[])[] = useAllWidgets()) {
  return makeFluentFeature(FluentFormFeatureKind.UIAdapter, [
    {
      provide: FLUENT_FORM_CONTENT,
      useValue: FormContentComponent
    },
    {
      provide: FLUENT_FORM_ITEM_CONTENT,
      useValue: FormItemContentComponent
    },
    provideWidgetConfigs(widgets)
  ]);
}
