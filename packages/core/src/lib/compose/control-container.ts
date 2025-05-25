import { computed, Signal } from '@angular/core';
import { SafeAny } from '@ngify/types';
import { AbstractFormGroupSchema, AbstractSchema } from '../schemas';
import { Indexable } from '../types';
import { isArray } from '../utils';
import { composeBuilder } from './builder';

type FormComposeFn = () => SafeAny;

export function form(composeFn: FormComposeFn): Signal<AbstractFormGroupSchema>
export function form(schemas: Indexable<AbstractSchema>[]): AbstractFormGroupSchema;
export function form(schemasOrComposeFn: Indexable<AbstractSchema>[] | FormComposeFn): AbstractFormGroupSchema | Signal<AbstractFormGroupSchema> {
  if (isArray(schemasOrComposeFn)) {
    return {
      kind: 'group',
      key: 'root',
      schemas: schemasOrComposeFn,
    };
  }
  return computed(() =>
    composeBuilder<AbstractFormGroupSchema>()
      .kind('group')
      .key('root')
      .schemas(schemasOrComposeFn)
      .build()
  );
}
