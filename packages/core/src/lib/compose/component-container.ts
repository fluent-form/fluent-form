import type { RowComponentSchema, SingleSchemaKey } from '../schemas';
import { type UnstableBuilder, composeBuilder } from './builder';
import type { KindOrKey } from './helper';

export function row<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<RowComponentSchema<Key>, KindOrKey> {
  return composeBuilder<RowComponentSchema<Key>>().kind('row').key(key);
}
