import type { Provider } from '@angular/core';
import { type SchemaPatcher, provideSchemaPatcher } from '../patcher';
import { makeFluentFeature } from './helper';
import { type FluentFormFeature, FluentFormFeatureKind } from './interface';

export function withSchemaPatchers(patchers: (SchemaPatcher | SchemaPatcher[])[]): FluentFormFeature<FluentFormFeatureKind.SchemaPatcher> {
  return makeFluentFeature(
    FluentFormFeatureKind.SchemaPatcher,
    patchers.flat().map<Provider>(patcher => provideSchemaPatcher(patcher))
  );
}
