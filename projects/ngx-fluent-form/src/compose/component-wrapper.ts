import { ButtonGroupComponentSchema, SingleSchemaKey } from '../schemas';
import { UnstableBuilder, composeBuilder } from './compose-builder';
import { KindOrKey } from './helper';

export function buttonGroup<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<ButtonGroupComponentSchema<Key>, KindOrKey> {
  return composeBuilder<ButtonGroupComponentSchema<Key>>().kind('button-group').key(key);
}
