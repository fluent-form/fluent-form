import { Provider } from '@angular/core';
import { FluentFormFeature } from './features';

export function provideFluentForm(...features: FluentFormFeature[]): Provider[] {
  return features.map(feature => feature.providers);
}
