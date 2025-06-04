import { InjectionToken, type Provider } from '@angular/core';
import type { SchemaPatcher } from './interfaces';

declare const ngDevMode: boolean | undefined;

export const SCHEMA_PATCHERS = new InjectionToken<SchemaPatcher[]>(
  typeof ngDevMode !== 'undefined' && ngDevMode ? 'SchemaPatchers' : ''
);

export function provideSchemaPatcher(patcher: SchemaPatcher): Provider {
  return {
    provide: SCHEMA_PATCHERS,
    useValue: patcher,
    multi: true
  };
}
