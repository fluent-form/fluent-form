import { RowComponentSchema, SingleSchemaKey } from '../schemas';
import { UnstableBuilder, composeBuilder } from './builder';
import { KindOrKey } from './helper';

export function row<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<RowComponentSchema<Key>, KindOrKey> {
  return composeBuilder<RowComponentSchema<Key>>().kind('row').key(key);
}
