import { UnstableBuilder, composeBuilder } from '../../compose';
import { KindOrKey } from '../../compose/helper';
import { SchemaKey, SingleSchemaKey } from '../../schemas';
import { HeadlessControlSchema, RangeControlSchema, TextControlSchema } from '../schemas';

export function headless<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<HeadlessControlSchema<Key>, KindOrKey> {
  return composeBuilder<HeadlessControlSchema<Key>>().kind('headless').key(key);
}

export function text<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<TextControlSchema<Key>, KindOrKey> {
  return composeBuilder<TextControlSchema<Key>>().kind('text').key(key);
}

export function range<Key extends SchemaKey>(key?: Key): UnstableBuilder<RangeControlSchema<Key>, KindOrKey> {
  return composeBuilder<RangeControlSchema<Key>>().kind('range').key(key);
}
