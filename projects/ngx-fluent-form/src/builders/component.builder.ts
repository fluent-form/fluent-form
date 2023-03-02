import { ButtonComponentSchema, TextComponentSchema } from '../schemas';
import { SchemaName } from '../schemas/types';
import { UnstableBuilder, builder } from '../utils';
import { KindOrName } from './helper';

export function text<N extends SchemaName>(name?: N): UnstableBuilder<TextComponentSchema<N>, KindOrName> {
  return builder<TextComponentSchema<N>>().kind('text').name(name);
}

export function button<N extends SchemaName>(name?: N): UnstableBuilder<ButtonComponentSchema<N>, KindOrName> {
  return builder<ButtonComponentSchema<N>>().kind('button').name(name);
}
