import { UnstableBuilder, composeBuilder } from '../../compose';
import { KindOrKey } from '../../compose/helper';
import { SchemaKey, SingleSchemaKey } from '../../schemas';
import { HeadedControlSchema, NumberFieldControlSchema, RangeControlSchema, TextFieldControlSchema } from '../schemas';

export function headed<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<HeadedControlSchema<Key>, KindOrKey> {
  return composeBuilder<HeadedControlSchema<Key>>().kind('headed').key(key);
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
