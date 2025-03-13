import { UnstableBuilder, composeBuilder } from '../../compose';
import { KindOrKey } from '../../compose/helper';
import { SingleSchemaKey } from '../../schemas';
import { FieldGroupComponentSchema } from '../schemas';

export function fieldGroup<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<FieldGroupComponentSchema<Key>, KindOrKey> {
  return composeBuilder<FieldGroupComponentSchema<Key>>().kind('field-group').key(key);
}
