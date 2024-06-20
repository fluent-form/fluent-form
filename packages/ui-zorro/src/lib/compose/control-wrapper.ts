import { SingleSchemaKey, UnstableBuilder, composeBuilder } from '@fluent-form/core';
import { InputGroupComponentSchema, NumberGroupComponentSchema } from '../schemas';
import { KindOrKey } from './helper';

export function inputGroup<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<InputGroupComponentSchema<Key>, KindOrKey> {
  return composeBuilder<InputGroupComponentSchema<Key>>().kind('input-group').key(key);
}

export function numberGroup<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<NumberGroupComponentSchema<Key>, KindOrKey> {
  return composeBuilder<NumberGroupComponentSchema<Key>>().kind('number-group').key(key);
}
