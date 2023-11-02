import { Provider } from '@angular/core';
import { SchemaPatcher } from '../interfaces';
import { makeFluentFeature, provideSchemaPatcher } from './helper';
import { FluentFormFeature, FluentFormFeatureKind } from './interface';

export function withSchemaPatchers(...patchers: SchemaPatcher[]): FluentFormFeature<FluentFormFeatureKind.SchemaPatcher> {
  return makeFluentFeature(
    FluentFormFeatureKind.SchemaPatcher,
    patchers.map<Provider>(patcher => provideSchemaPatcher(patcher))
  );
}
