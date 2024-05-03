import { makeEnvironmentProviders } from '@angular/core';
import { FluentFormFeature, FluentFormFeatureKind, withZorro } from './features';

export function provideFluentForm(...features: FluentFormFeature<FluentFormFeatureKind>[]) {
  features.push(withZorro());

  return makeEnvironmentProviders([
    features.map(feature => feature.providers),
  ]);
}
