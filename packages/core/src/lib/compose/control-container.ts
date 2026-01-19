import { type Signal, computed } from '@angular/core';
import type { AbstractFormGroupSchema, AbstractSchema } from '../schemas';
import type { Indexable } from '../types';
import { isArray } from '../utils';
import { composeBuilder } from './builder';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SafeAny = any;
type ComposeFn = () => SafeAny;

export function form(composeFn: ComposeFn): Signal<AbstractFormGroupSchema>;
export function form(schemas: Indexable<AbstractSchema>[]): AbstractFormGroupSchema;
export function form(schemasOrComposeFn: Indexable<AbstractSchema>[] | ComposeFn): AbstractFormGroupSchema | Signal<AbstractFormGroupSchema> {
  if (isArray(schemasOrComposeFn)) {
    return {
      kind: 'group',
      key: 'root',
      schemas: schemasOrComposeFn
    };
  }

  return computed(() =>
    composeBuilder<AbstractFormGroupSchema>()
      .kind('group')
      .key('root')
      .schemas(schemasOrComposeFn)
      .build());
}
