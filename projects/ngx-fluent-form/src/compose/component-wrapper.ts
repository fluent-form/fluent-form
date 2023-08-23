import { ButtonGroupComponentSchema, SchemaKey } from '../schemas';
import { composeBuilder, UnstableBuilder } from './compose-builder';
import { KindOrKey } from './helper';

export function buttonGroup<Key extends SchemaKey>(key?: Key): UnstableBuilder<ButtonGroupComponentSchema<Key>, KindOrKey> {
  return composeBuilder<ButtonGroupComponentSchema<Key>>().kind('button-group').key(key);
}
