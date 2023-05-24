import { TemplateSchema } from '../schemas';
import { SchemaName } from '../schemas/types';
import { builder, UnstableBuilder } from '../utils';
import { KindOrKey } from './helper';

export function template<N extends SchemaName>(key?: N): UnstableBuilder<TemplateSchema<N>, KindOrKey> {
  return builder<TemplateSchema<N>>().kind('template').key(key);
}
