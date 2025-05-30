import { makeEnvironmentProviders } from '@angular/core';
import { type FluentFormFeature, FluentFormFeatureKind } from './features';

export function provideFluentForm(...features: FluentFormFeature<FluentFormFeatureKind>[]) {
  return makeEnvironmentProviders([
    features.map(feature => feature.providers),
  ]);
}
