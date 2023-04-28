import { TemplateSchema } from '../schemas';
import { SchemaName } from '../schemas/types';
import { UnstableBuilder, builder } from '../utils';
import { KindOrName } from './helper';

export function template<N extends SchemaName>(name?: N): UnstableBuilder<TemplateSchema<N>, KindOrName> {
  return builder<TemplateSchema<N>>().kind('template').name(name);
}
