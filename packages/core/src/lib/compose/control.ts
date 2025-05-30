import type { HeadlessControlSchema, SingleSchemaKey } from '../schemas';
import { type UnstableBuilder, composeBuilder } from './builder';
import type { KindOrKey } from './helper';

export function headless<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<HeadlessControlSchema<Key>, KindOrKey> {
  return composeBuilder<HeadlessControlSchema<Key>>().kind('headless').key(key);
}
