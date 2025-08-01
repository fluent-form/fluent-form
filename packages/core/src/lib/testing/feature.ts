import type { SafeAny } from '@ngify/core';
import { FluentFormFeatureKind, type FluentFormWidgetConfig, makeFluentFeature, provideWidgetConfigs } from '../features';
import { FLUENT_FORM_CONTENT, FLUENT_FORM_FIELD_CONTENT } from '../tokens';
import { FormContentComponent, FormFieldContentComponent } from './components';
import { useAllWidgets } from './widgets';

export function withTesting(widgets: (FluentFormWidgetConfig<SafeAny> | FluentFormWidgetConfig<SafeAny>[])[] = useAllWidgets()) {
  return makeFluentFeature(FluentFormFeatureKind.UIAdapter, [
    {
      provide: FLUENT_FORM_CONTENT,
      useValue: FormContentComponent
    },
    {
      provide: FLUENT_FORM_FIELD_CONTENT,
      useValue: FormFieldContentComponent
    },
    provideWidgetConfigs(widgets)
  ]);
}
