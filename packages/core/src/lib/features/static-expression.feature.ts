import { CodeEvaluator, DynamicCodeEvaluator } from '../services';
import { makeFluentFeature } from './helper';
import { type FluentFormFeature, FluentFormFeatureKind } from './interface';

export function withStaticExpression(): FluentFormFeature<FluentFormFeatureKind.StaticExpression> {
  return makeFluentFeature(FluentFormFeatureKind.StaticExpression, [
    {
      provide: CodeEvaluator,
      useExisting: DynamicCodeEvaluator
    }
  ]);
}
