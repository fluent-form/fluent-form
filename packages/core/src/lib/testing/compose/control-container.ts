import { computed, type Signal } from '@angular/core';
import type { SafeAny } from '@ngify/core';
import { composeBuilder, type Builder, type UnstableBuilder } from '../../compose';
import type { KindOrKey } from '../../compose/helper';
import type { AbstractFormGroupSchema, SingleSchemaKey } from '../../schemas';
import type { FormArraySchema, FormGroupSchema } from '../schemas';

export function form(composeFn: (it: Builder<FormGroupSchema>) => SafeAny): Signal<AbstractFormGroupSchema> {
  return computed(() =>
    composeBuilder<AbstractFormGroupSchema>()
      .kind('group')
      .key('root')
      .schemas(composeFn)
      .build());
}

export function group<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<FormGroupSchema<Key>, KindOrKey> {
  return composeBuilder<FormGroupSchema<Key>>().kind('group').key(key);
}

export function array<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<FormArraySchema<Key>, KindOrKey> {
  return composeBuilder<FormArraySchema<Key>>().kind('array').key(key);
}
