import { InputGroupComponentSchema, SchemaName } from '../schemas';
import { KindAndName } from '../types';
import { builder, UnstableBuilder } from '../utils';

export function inputGroup<N extends SchemaName>(name?: N): UnstableBuilder<InputGroupComponentSchema<N>, KindAndName> {
  return builder<InputGroupComponentSchema<N>>().kind('input-group').name(name);
}