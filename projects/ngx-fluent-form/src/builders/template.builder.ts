import { SchemaKey, TemplateSchema } from '../schemas';
import { builder, UnstableBuilder } from '../utils';
import { KindOrKey } from './helper';

export function template<Key extends SchemaKey>(key?: Key): UnstableBuilder<TemplateSchema<Key>, KindOrKey> {
  return builder<TemplateSchema<Key>>().kind('template').key(key);
}
