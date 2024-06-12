import { UnstableBuilder, composeBuilder } from '../../compose';
import { KindOrKey } from '../../compose/helper';
import { SingleSchemaKey } from '../../schemas';
import { InputGroupComponentSchema } from '../schemas';

export function inputGroup<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<InputGroupComponentSchema<Key>, KindOrKey> {
  return composeBuilder<InputGroupComponentSchema<Key>>().kind('input-group').key(key);
}
