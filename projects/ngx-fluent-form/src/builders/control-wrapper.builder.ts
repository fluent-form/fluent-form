import { AnyControlWrapperSchema, InputGroupComponentSchema } from '../schemas';
import { SchemaName } from '../schemas/types';
import { Builder, UnstableBuilder, builder } from '../utils';
import { KindOrName, KindOrSchemas, REST_SCHEMA, RestSchema, isEmptyArray, isSchemaNameTuple } from './helper';

function controlWrapperBuilder<T extends AnyControlWrapperSchema>(): Builder<T, RestSchema> {
  return builder<T, RestSchema>(REST_SCHEMA);
}

export function inputGroup<N extends SchemaName>(name?: N): UnstableControlWrapperBuilder<InputGroupComponentSchema<N>, KindOrName>;
export function inputGroup(...schemas: InputGroupComponentSchema['schemas']): UnstableControlWrapperBuilder<InputGroupComponentSchema, KindOrSchemas>;
export function inputGroup(...nameOrSchemas: [SchemaName] | InputGroupComponentSchema['schemas']) {
  if (isEmptyArray(nameOrSchemas) || isSchemaNameTuple(nameOrSchemas)) {
    return controlWrapperBuilder<InputGroupComponentSchema>().kind('input-group').name(nameOrSchemas[0]);
  }

  return controlWrapperBuilder<InputGroupComponentSchema>().kind('input-group').schemas(...nameOrSchemas);
}

type UnstableControlWrapperBuilder<T extends AnyControlWrapperSchema, S extends keyof T> = UnstableBuilder<T, S, RestSchema>
