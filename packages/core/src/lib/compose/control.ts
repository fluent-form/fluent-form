import { HeadlessControlSchema, SingleSchemaKey } from '../schemas';
import { UnstableBuilder, composeBuilder } from './builder';
import { KindOrKey } from './helper';

export function headless<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<HeadlessControlSchema<Key>, KindOrKey> {
  return composeBuilder<HeadlessControlSchema<Key>>().kind('headless').key(key);
}
