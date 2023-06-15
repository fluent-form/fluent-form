import { AnyControlWrapperSchema, InputGroupComponentSchema, SchemaKey } from '../schemas';
import { Builder, builder, UnstableBuilder } from '../utils';
import { isEmptyArray, isSchemaKeyTuple, KindOrKey, KindOrSchemas, RestSchema, REST_SCHEMA } from './helper';

function controlWrapperBuilder<T extends AnyControlWrapperSchema>(): Builder<T, RestSchema> {
  return builder<T, RestSchema>(REST_SCHEMA);
}

export function inputGroup<Key extends SchemaKey>(key?: Key): UnstableControlWrapperBuilder<InputGroupComponentSchema<Key>, KindOrKey>;
export function inputGroup(...schemas: InputGroupComponentSchema['schemas']): UnstableControlWrapperBuilder<InputGroupComponentSchema, KindOrSchemas>;
export function inputGroup(...keyOrSchemas: [SchemaKey] | InputGroupComponentSchema['schemas']) {
  if (isEmptyArray(keyOrSchemas) || isSchemaKeyTuple(keyOrSchemas)) {
    return controlWrapperBuilder<InputGroupComponentSchema>().kind('input-group').key(keyOrSchemas[0]);
  }

  return controlWrapperBuilder<InputGroupComponentSchema>().kind('input-group').schemas(...keyOrSchemas);
}

export type UnstableControlWrapperBuilder<T extends AnyControlWrapperSchema, S extends keyof T> = UnstableBuilder<T, S, RestSchema>
