import { type UnstableBuilder, composeBuilder } from '../../compose';
import type { KindOrKey } from '../../compose/helper';
import type { SingleSchemaKey } from '../../schemas';
import type { FieldGroupComponentSchema } from '../schemas';

export function fieldGroup<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<FieldGroupComponentSchema<Key>, KindOrKey> {
  return composeBuilder<FieldGroupComponentSchema<Key>>().kind('field-group').key(key);
}
