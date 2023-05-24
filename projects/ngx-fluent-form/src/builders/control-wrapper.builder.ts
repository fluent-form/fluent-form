import { AnyControlWrapperSchema, InputGroupComponentSchema } from '../schemas';
import { SchemaName } from '../schemas/types';
import { Builder, builder, UnstableBuilder } from '../utils';
import { isEmptyArray, isSchemaNameTuple, KindOrKey, KindOrSchemas, RestSchema, REST_SCHEMA } from './helper';

function controlWrapperBuilder<T extends AnyControlWrapperSchema>(): Builder<T, RestSchema> {
  return builder<T, RestSchema>(REST_SCHEMA);
}

export function inputGroup<N extends SchemaName>(key?: N): UnstableControlWrapperBuilder<InputGroupComponentSchema<N>, KindOrKey>;
export function inputGroup(...schemas: InputGroupComponentSchema['schemas']): UnstableControlWrapperBuilder<InputGroupComponentSchema, KindOrSchemas>;
export function inputGroup(...keyOrSchemas: [SchemaName] | InputGroupComponentSchema['schemas']) {
  if (isEmptyArray(keyOrSchemas) || isSchemaNameTuple(keyOrSchemas)) {
    return controlWrapperBuilder<InputGroupComponentSchema>().kind('input-group').key(keyOrSchemas[0]);
  }

  return controlWrapperBuilder<InputGroupComponentSchema>().kind('input-group').schemas(...keyOrSchemas);
}

export type UnstableControlWrapperBuilder<T extends AnyControlWrapperSchema, S extends keyof T> = UnstableBuilder<T, S, RestSchema>
