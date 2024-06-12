import { InjectionToken, Provider } from '@angular/core';
import { SchemaPatcher } from './interfaces';

export const SCHEMA_PATCHERS = new InjectionToken<SchemaPatcher[]>('SchemaPatchers');

export function provideSchemaPatcher(patcher: SchemaPatcher): Provider {
  return {
    provide: SCHEMA_PATCHERS,
    useValue: patcher,
    multi: true
  };
}
