import { Provider } from '@angular/core';

export const enum FluentFormFeatureKind {
  UIAdapter,
  FormContent,
  Widget,
  StaticExpression,
  SchemaPatcher
}

export interface FluentFormFeature<K extends FluentFormFeatureKind> {
  kind: K;
  providers: Provider[];
}
