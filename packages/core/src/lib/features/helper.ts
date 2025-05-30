import type { Provider } from '@angular/core';
import { type FluentFormFeature, FluentFormFeatureKind } from './interface';

export function makeFluentFeature<K extends FluentFormFeatureKind>(kind: K, providers: Provider[]): FluentFormFeature<K> {
  return { kind, providers };
}
