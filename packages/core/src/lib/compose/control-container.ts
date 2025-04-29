import { computed, Signal } from '@angular/core';
import { SafeAny } from '@ngify/types';
import { AbstractFormGroupSchema, AbstractSchema } from '../schemas';
import { Indexable } from '../types';
import { isArray } from '../utils';
import { composeBuilder } from './builder';

export function form(composeFn: FormComposeFn): AbstractFormGroupSchema;
export function form(schemas: Indexable<AbstractSchema>[]): AbstractFormGroupSchema;
export function form(fnOrSchemas: Indexable<AbstractSchema>[] | FormComposeFn): AbstractFormGroupSchema {
  if (isArray(fnOrSchemas)) {
    return {
      kind: 'group',
      key: 'root',
      schemas: fnOrSchemas,
    };
  }

  return composeBuilder<AbstractFormGroupSchema>()
    .kind('group')
    .key('root')
    .schemas(fnOrSchemas)
    .build();
}

type FormComposeFn = () => SafeAny;

export function fluentForm(composeFn: FormComposeFn): Signal<AbstractFormGroupSchema> {
  return computed(() =>
    composeBuilder<AbstractFormGroupSchema>()
      .kind('group')
      .key('root')
      .schemas(composeFn)
      .build()
  );
}
