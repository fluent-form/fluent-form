import { makeEnvironmentProviders } from '@angular/core';
import { FluentFormFeature, FluentFormFeatureKind } from './features';

export function provideFluentForm(...features: FluentFormFeature<FluentFormFeatureKind>[]) {
  return makeEnvironmentProviders(features.map(feature => feature.providers));
}
