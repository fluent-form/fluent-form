import { Provider } from '@angular/core';
import { FluentFormFeatureKind } from './kind';

export interface FluentFormFeature {
  kind: FluentFormFeatureKind;
  providers: Provider[];
}
