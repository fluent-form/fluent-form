import { AlertComponentSchema, ButtonComponentSchema, HeadingComponentSchema, SingleSchemaKey, TemplateSchema, TextComponentSchema } from '../schemas';
import { UnstableBuilder, composeBuilder } from './compose-builder';
import { KindOrKey } from './helper';

export function template<Key extends SingleSchemaKey>(key: Key): UnstableBuilder<TemplateSchema<Key>, KindOrKey> {
  return composeBuilder<TemplateSchema<Key>>().kind('template').key(key);
}

export function text<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<TextComponentSchema<Key>, KindOrKey> {
  return composeBuilder<TextComponentSchema<Key>>().kind('text').key(key);
}

export function button<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<ButtonComponentSchema<Key>, KindOrKey> {
  return composeBuilder<ButtonComponentSchema<Key>>().kind('button').key(key);
}

function heading<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<HeadingComponentSchema<Key>, KindOrKey> {
  return composeBuilder<HeadingComponentSchema<Key>>().kind('heading').key(key);
}
export function heading1<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<HeadingComponentSchema<Key>, KindOrKeyOrLevel> {
  return heading(key).level(1);
}
export function heading2<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<HeadingComponentSchema<Key>, KindOrKeyOrLevel> {
  return heading(key).level(2);
}
export function heading3<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<HeadingComponentSchema<Key>, KindOrKeyOrLevel> {
  return heading(key).level(3);
}
export function heading4<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<HeadingComponentSchema<Key>, KindOrKeyOrLevel> {
  return heading(key).level(4);
}
export function heading5<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<HeadingComponentSchema<Key>, KindOrKeyOrLevel> {
  return heading(key).level(5);
}
export function heading6<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<HeadingComponentSchema<Key>, KindOrKeyOrLevel> {
  return heading(key).level(6);
}

export function alert<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<AlertComponentSchema<Key>, KindOrKey> {
  return composeBuilder<AlertComponentSchema<Key>>().kind('alert').key(key);
}

type KindOrKeyOrLevel = KindOrKey | 'level';
