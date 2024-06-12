import { UnstableBuilder, composeBuilder } from '../../compose';
import { KindOrKey } from '../../compose/helper';
import { SingleSchemaKey } from '../../schemas';
import { FormArraySchema, FormGroupSchema } from '../schemas';

export function group<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<FormGroupSchema<Key>, KindOrKey> {
  return composeBuilder<FormGroupSchema<Key>>().kind('group').key(key);
}

export function array<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<FormArraySchema<Key>, KindOrKey> {
  return composeBuilder<FormArraySchema<Key>>().kind('array').key(key);
}
