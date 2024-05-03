import { Provider } from '@angular/core';

export const enum FluentFormFeatureKind {
  FormContent,
  Widget,
  StaticExpression,
  SchemaPatcher
}

export interface FluentFormFeature<K extends FluentFormFeatureKind> {
  kind: K;
  providers: Provider[];
}
