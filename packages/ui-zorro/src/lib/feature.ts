import {
  FLUENT_FORM_CONTENT,
  FLUENT_WIDGET_WRAPPERS,
  FluentFormFeatureKind,
  FluentFormWidgetConfig,
  makeFluentFeature,
  provideSchemaPatcher,
  provideWidgetConfigs
} from '@fluent-form/core';
import { SafeAny } from '@ngify/core';
import { FormContentComponent, FormFieldWrapper } from './components';

export function withZorro(widgets: (FluentFormWidgetConfig<SafeAny> | FluentFormWidgetConfig<SafeAny>[])[]) {
  return makeFluentFeature(FluentFormFeatureKind.UIAdapter, [
    {
      provide: FLUENT_FORM_CONTENT,
      useValue: FormContentComponent
    },
    {
      provide: FLUENT_WIDGET_WRAPPERS,
      useValue: [FormFieldWrapper]
    },
    provideWidgetConfigs(widgets),
    // 添加内置的 patcher
    provideSchemaPatcher({
      selector: 'group',
      patch: (schema: SafeAny) => {
        schema.layout ??= 'vertical';
        return schema;
      }
    })
  ]);
}
