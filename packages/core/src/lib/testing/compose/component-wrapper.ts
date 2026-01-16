import { type UnstableBuilder, composeBuilder } from '../../compose';
import type { KindOrKey } from '../../compose/helper';
import type { SingleSchemaKey } from '../../schemas';
import type { ButtonGroupComponentSchema } from '../schemas';

export function buttonGroup<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<ButtonGroupComponentSchema<Key>, KindOrKey> {
  return composeBuilder<ButtonGroupComponentSchema<Key>>().kind('button-group').key(key);
}
