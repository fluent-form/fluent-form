import type { SafeAny } from '@ngify/core';
import { FluentFormFeatureKind, type FluentFormWidgetConfig, makeFluentFeature, provideWidgetConfigs } from '../features';
import { FLUENT_FORM_CONTENT, FLUENT_WIDGET_WRAPPER } from '../tokens';
import { FormContentComponent, FormFieldWrapper } from './components';
import { useAllWidgets } from './widgets';

export function withTesting(widgets: (FluentFormWidgetConfig<SafeAny> | FluentFormWidgetConfig<SafeAny>[])[] = useAllWidgets()) {
  return makeFluentFeature(FluentFormFeatureKind.UIAdapter, [
    {
      provide: FLUENT_FORM_CONTENT,
      useValue: FormContentComponent
    },
    {
      provide: FLUENT_WIDGET_WRAPPER,
      useValue: FormFieldWrapper,
      multi: true
    },
    provideWidgetConfigs(widgets)
  ]);
}
