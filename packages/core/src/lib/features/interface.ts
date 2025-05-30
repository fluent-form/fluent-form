import type { Provider } from '@angular/core';

export const enum FluentFormFeatureKind {
  UIAdapter,
  StaticExpression,
  SchemaPatcher
}

export interface FluentFormFeature<K extends FluentFormFeatureKind> {
  kind: K;
  providers: Provider[];
}
