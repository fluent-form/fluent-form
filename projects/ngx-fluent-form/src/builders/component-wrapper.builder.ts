import { ButtonGroupComponentSchema, SchemaName } from '../schemas';
import { KindAndName } from '../types';
import { builder, UnstableBuilder } from '../utils';

export function buttonGroup<N extends SchemaName>(name?: N): UnstableBuilder<ButtonGroupComponentSchema<N>, KindAndName> {
  return builder<ButtonGroupComponentSchema<N>>().kind('button-group').name(name);
}