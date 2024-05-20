import { UnstableBuilder, composeBuilder } from '../compose';
import { SingleSchemaKey } from '../schemas';
import { ButtonComponentSchema, FormGroupSchema, HeadlessControlSchema, InputControlSchema, TemplateSchema } from './schemas';

export function template<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<TemplateSchema<Key>, KindOrKey> {
  return composeBuilder<TemplateSchema<Key>>().kind('template').key(key);
}

export function button<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<ButtonComponentSchema<Key>, KindOrKey> {
  return composeBuilder<ButtonComponentSchema<Key>>().kind('button').key(key);
}

export function headless<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<HeadlessControlSchema<Key>, KindOrKey> {
  return composeBuilder<HeadlessControlSchema<Key>>().kind('headless').key(key);
}

export function input<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<InputControlSchema<Key>, KindOrKey> {
  return composeBuilder<InputControlSchema<Key>>().kind('input').key(key);
}

export function group<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<FormGroupSchema<Key>, KindOrKey> {
  return composeBuilder<FormGroupSchema<Key>>().kind('group').key(key);
}

type KindOrKey = 'kind' | 'key'
