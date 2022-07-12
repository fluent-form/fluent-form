import { ButtonComponentSchema, InputGroupComponentSchema, SingleKeySchemaName } from '../schemas';
import { builder } from '../utils/builder.utils';

export function inputGroup<N extends SingleKeySchemaName>(name?: N) {
  return builder<InputGroupComponentSchema<N>>().type('input-group').name(name);
}

export function button<N extends SingleKeySchemaName>(name?: N) {
  return builder<ButtonComponentSchema<N>>().type('button').name(name);
}