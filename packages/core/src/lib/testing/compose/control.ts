import { type UnstableBuilder, composeBuilder } from '../../compose';
import type { KindOrKey } from '../../compose/helper';
import type { SchemaKey, SingleSchemaKey } from '../../schemas';
import type { HeadfulControlSchema, NumberFieldControlSchema, RangeControlSchema, TextFieldControlSchema } from '../schemas';

export function headful<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<HeadfulControlSchema<Key>, KindOrKey> {
  return composeBuilder<HeadfulControlSchema<Key>>().kind('headful').key(key);
}

export function textField<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<TextFieldControlSchema<Key>, KindOrKey> {
  return composeBuilder<TextFieldControlSchema<Key>>().kind('text-field').key(key);
}

export function range<Key extends SchemaKey>(key?: Key): UnstableBuilder<RangeControlSchema<Key>, KindOrKey> {
  return composeBuilder<RangeControlSchema<Key>>().kind('range').key(key);
}

export function numberField<Key extends SchemaKey>(key?: Key): UnstableBuilder<NumberFieldControlSchema<Key>, KindOrKey> {
  return composeBuilder<NumberFieldControlSchema<Key>>().kind('number-field').key(key);
}
