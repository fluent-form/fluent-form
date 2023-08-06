import { Provider } from '@angular/core';
import { SchemaPatcher } from '../interfaces';
import { SCHEMA_PATCHERS } from '../tokens';
import { FluentFormFeature, FluentFormFeatureKind } from './interface';

export function makeFluentFeature<K extends FluentFormFeatureKind>(kind: K, providers: Provider[]): FluentFormFeature<K> {
  return { kind, providers };
}

export function provideSchemaPatcher(patcher: SchemaPatcher): Provider {
  return {
    provide: SCHEMA_PATCHERS,
    useValue: patcher,
    multi: true
  };
}
