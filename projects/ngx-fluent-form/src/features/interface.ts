import { Provider } from '@angular/core';

export const enum FluentFormFeatureKind {
  Widget,
  StaticExpression,
  SchemaPatcher
}

export interface FluentFormFeature<K extends FluentFormFeatureKind> {
  kind: K;
  providers: Provider[];
}
