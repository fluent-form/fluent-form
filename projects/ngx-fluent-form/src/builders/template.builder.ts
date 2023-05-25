import { TemplateSchema } from '../schemas';
import { SchemaKey } from '../schemas/types';
import { builder, UnstableBuilder } from '../utils';
import { KindOrKey } from './helper';

export function template<Key extends SchemaKey>(key?: Key): UnstableBuilder<TemplateSchema<Key>, KindOrKey> {
  return builder<TemplateSchema<Key>>().kind('template').key(key);
}
