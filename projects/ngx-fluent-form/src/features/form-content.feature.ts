import { FormContentComponent } from '../components';
import { FORM_CONTENT } from '../tokens';
import { makeFluentFeature } from './helper';
import { FluentFormFeature, FluentFormFeatureKind } from './interface';

export function withZorro(): FluentFormFeature<FluentFormFeatureKind.FormContent> {
  return makeFluentFeature(FluentFormFeatureKind.FormContent, [
    {
      provide: FORM_CONTENT,
      useValue: FormContentComponent
    }
  ]);
}
