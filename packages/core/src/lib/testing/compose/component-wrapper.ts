import { UnstableBuilder, composeBuilder } from '../../compose';
import { KindOrKey } from '../../compose/helper';
import { SingleSchemaKey } from '../../schemas';
import { ButtonGroupComponentSchema } from '../schemas';

export function buttonGroup<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<ButtonGroupComponentSchema<Key>, KindOrKey> {
  return composeBuilder<ButtonGroupComponentSchema<Key>>().kind('button-group').key(key);
}
