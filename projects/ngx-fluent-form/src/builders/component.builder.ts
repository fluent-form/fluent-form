import { ButtonComponentSchema, SchemaKey, TemplateSchema, TextComponentSchema } from '../schemas';
import { builder, UnstableBuilder } from '../utils';
import { KindOrKey } from './helper';

export function template<Key extends SchemaKey>(key?: Key): UnstableBuilder<TemplateSchema<Key>, KindOrKey> {
  return builder<TemplateSchema<Key>>().kind('template').key(key);
}

export function text<Key extends SchemaKey>(key?: Key): UnstableBuilder<TextComponentSchema<Key>, KindOrKey> {
  return builder<TextComponentSchema<Key>>().kind('text').key(key);
}

export function button<Key extends SchemaKey>(key?: Key): UnstableBuilder<ButtonComponentSchema<Key>, KindOrKey> {
  return builder<ButtonComponentSchema<Key>>().kind('button').key(key);
}
