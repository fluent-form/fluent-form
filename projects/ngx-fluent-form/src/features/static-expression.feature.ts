import { CodeEvaluator, DynamicCodeEvaluator } from '../services';
import { makeFluentFormFeature } from './helper';
import { FluentFormFeature, FluentFormFeatureKind } from './interface';

export function withStaticExpression(): FluentFormFeature<FluentFormFeatureKind.StaticExpression> {
  return makeFluentFormFeature(FluentFormFeatureKind.StaticExpression, [
    {
      provide: CodeEvaluator,
      useClass: DynamicCodeEvaluator
    }
  ]);
}
