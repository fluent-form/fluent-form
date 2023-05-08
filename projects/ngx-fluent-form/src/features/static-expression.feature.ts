import { CodeEvaluator, DynamicCodeEvaluator } from '../services';
import { FluentFormFeature } from './interfaces';
import { FluentFormFeatureKind } from './kind';

export function withStaticExpression(): FluentFormFeature {
  return {
    kind: FluentFormFeatureKind.StaticExpression,
    providers: [
      {
        provide: CodeEvaluator,
        useClass: DynamicCodeEvaluator
      }
    ]
  };
}
