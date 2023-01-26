import { AnyControlWrapperSchema, InputGroupComponentSchema, SchemaName } from '../schemas';
import { Builder, builder, UnstableBuilder } from '../utils';
import { KindAndName, RestSchema, REST_SCHEMA } from './helper';

function controlWrapperBuilder<T extends AnyControlWrapperSchema>(): Builder<T, RestSchema> {
  return builder<T, RestSchema>(REST_SCHEMA);
}

export function inputGroup<N extends SchemaName>(name?: N): UnstableControlWrapperBuilder<InputGroupComponentSchema<N>, KindAndName> {
  return controlWrapperBuilder<InputGroupComponentSchema<N>>().kind('input-group').name(name);
}

type UnstableControlWrapperBuilder<T extends AnyControlWrapperSchema, S extends keyof T> = UnstableBuilder<T, S, RestSchema>
