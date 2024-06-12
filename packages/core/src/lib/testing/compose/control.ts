import { UnstableBuilder, composeBuilder } from '../../compose';
import { KindOrKey } from '../../compose/helper';
import { SchemaKey, SingleSchemaKey } from '../../schemas';
import { HeadlessControlSchema, InputControlSchema, RangeControlSchema } from '../schemas';

export function headless<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<HeadlessControlSchema<Key>, KindOrKey> {
  return composeBuilder<HeadlessControlSchema<Key>>().kind('headless').key(key);
}

export function input<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<InputControlSchema<Key>, KindOrKey> {
  return composeBuilder<InputControlSchema<Key>>().kind('input').key(key);
}

export function range<Key extends SchemaKey>(key?: Key): UnstableBuilder<RangeControlSchema<Key>, KindOrKey> {
  return composeBuilder<RangeControlSchema<Key>>().kind('range').key(key);
}
