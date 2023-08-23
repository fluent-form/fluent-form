import { ButtonComponentSchema, HeadingComponentSchema, SchemaKey, TemplateSchema, TextComponentSchema } from '../schemas';
import { composeBuilder, UnstableBuilder } from './compose-builder';
import { KindOrKey } from './helper';

export function template<Key extends SchemaKey>(key: Key): UnstableBuilder<TemplateSchema<Key>, KindOrKey> {
  return composeBuilder<TemplateSchema<Key>>().kind('template').key(key);
}

export function text<Key extends SchemaKey>(key?: Key): UnstableBuilder<TextComponentSchema<Key>, KindOrKey> {
  return composeBuilder<TextComponentSchema<Key>>().kind('text').key(key);
}

export function button<Key extends SchemaKey>(key?: Key): UnstableBuilder<ButtonComponentSchema<Key>, KindOrKey> {
  return composeBuilder<ButtonComponentSchema<Key>>().kind('button').key(key);
}

function heading<Key extends SchemaKey>(key?: Key): UnstableBuilder<HeadingComponentSchema<Key>, KindOrKey> {
  return composeBuilder<HeadingComponentSchema<Key>>().kind('heading').key(key);
}
export function heading1<Key extends SchemaKey>(key?: Key): UnstableBuilder<HeadingComponentSchema<Key>, KindOrKeyOrLevel> {
  return heading(key).level(1);
}
export function heading2<Key extends SchemaKey>(key?: Key): UnstableBuilder<HeadingComponentSchema<Key>, KindOrKeyOrLevel> {
  return heading(key).level(2);
}
export function heading3<Key extends SchemaKey>(key?: Key): UnstableBuilder<HeadingComponentSchema<Key>, KindOrKeyOrLevel> {
  return heading(key).level(3);
}
export function heading4<Key extends SchemaKey>(key?: Key): UnstableBuilder<HeadingComponentSchema<Key>, KindOrKeyOrLevel> {
  return heading(key).level(4);
}
export function heading5<Key extends SchemaKey>(key?: Key): UnstableBuilder<HeadingComponentSchema<Key>, KindOrKeyOrLevel> {
  return heading(key).level(5);
}
export function heading6<Key extends SchemaKey>(key?: Key): UnstableBuilder<HeadingComponentSchema<Key>, KindOrKeyOrLevel> {
  return heading(key).level(6);
}

type KindOrKeyOrLevel = KindOrKey | 'level';
