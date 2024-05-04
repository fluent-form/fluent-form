import { Type } from '@angular/core';
import { AbstractFormContentComponent, FormContentComponent } from '../components';
import { FLUENT_FORM_CONTENT } from '../tokens';
import { makeFluentFeature } from './helper';
import { FluentFormFeature, FluentFormFeatureKind } from './interface';

export function withFormContent(clazz: Type<AbstractFormContentComponent>): FluentFormFeature<FluentFormFeatureKind.FormContent> {
  return makeFluentFeature(FluentFormFeatureKind.FormContent, [
    {
      provide: FLUENT_FORM_CONTENT,
      useValue: clazz
    }
  ]);
}

export function withZorro(): FluentFormFeature<FluentFormFeatureKind.FormContent> {
  return withFormContent(FormContentComponent);
}
