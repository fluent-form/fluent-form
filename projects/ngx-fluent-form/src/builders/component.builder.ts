import { ButtonComponentSchema, TextComponentSchema } from '../schemas';
import { SchemaName } from '../schemas/types';
import { builder, UnstableBuilder } from '../utils';
import { KindOrKey } from './helper';

export function text<N extends SchemaName>(key?: N): UnstableBuilder<TextComponentSchema<N>, KindOrKey> {
  return builder<TextComponentSchema<N>>().kind('text').key(key);
}

export function button<N extends SchemaName>(key?: N): UnstableBuilder<ButtonComponentSchema<N>, KindOrKey> {
  return builder<ButtonComponentSchema<N>>().kind('button').key(key);
}
