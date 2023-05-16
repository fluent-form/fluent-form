import { Provider } from '@angular/core';
import { FluentFormFeature, FluentFormFeatureKind } from './features';

export function provideFluentForm(...features: FluentFormFeature<FluentFormFeatureKind>[]): Provider[] {
  return features.map(feature => feature.providers);
}
