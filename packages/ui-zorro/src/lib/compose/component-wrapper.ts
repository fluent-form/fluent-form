import { SingleSchemaKey, UnstableBuilder, composeBuilder } from '@fluent-form/core';
import { ButtonGroupComponentSchema } from '../schemas';
import { KindOrKey } from './helper';

/**
 * @deprecated
 * @param key
 * @returns
 */
export function buttonGroup<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<ButtonGroupComponentSchema<Key>, KindOrKey> {
  return composeBuilder<ButtonGroupComponentSchema<Key>>().kind('button-group').key(key);
}
