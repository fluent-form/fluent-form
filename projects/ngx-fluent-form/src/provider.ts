import { makeEnvironmentProviders } from '@angular/core';
import { CONFIG, DEFAULT_CONFIG } from './config';
import { FluentFormFeature, FluentFormFeatureKind } from './features';

export function provideFluentForm(...features: FluentFormFeature<FluentFormFeatureKind>[]) {
  return makeEnvironmentProviders([
    { provide: CONFIG, useValue: DEFAULT_CONFIG },
    features.map(feature => feature.providers)
  ]);
}
