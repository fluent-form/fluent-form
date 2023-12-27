import { InputGroupComponentSchema, NumberGroupComponentSchema, SingleSchemaKey } from '../schemas';
import { UnstableBuilder, composeBuilder } from './compose-builder';
import { KindOrKey } from './helper';

export function inputGroup<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<InputGroupComponentSchema<Key>, KindOrKey> {
  return composeBuilder<InputGroupComponentSchema<Key>>().kind('input-group').key(key);
}

export function numberGroup<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<NumberGroupComponentSchema<Key>, KindOrKey> {
  return composeBuilder<NumberGroupComponentSchema<Key>>().kind('number-group').key(key);
}
