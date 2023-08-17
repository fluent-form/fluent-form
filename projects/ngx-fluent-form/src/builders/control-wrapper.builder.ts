import { AnyControlWrapperSchema, InputGroupComponentSchema, SchemaKey } from '../schemas';
import { Builder, builder, UnstableBuilder } from '../utils';
import { KindOrKey, RestSchema, REST_SCHEMA } from './helper';

function controlWrapperBuilder<T extends AnyControlWrapperSchema>(): Builder<T, RestSchema> {
  return builder<T, RestSchema>(REST_SCHEMA);
}

export function inputGroup<Key extends SchemaKey>(key?: Key): UnstableControlWrapperBuilder<InputGroupComponentSchema<Key>, KindOrKey> {
  return controlWrapperBuilder<InputGroupComponentSchema<Key>>().kind('input-group').key(key);
}

export type UnstableControlWrapperBuilder<T extends AnyControlWrapperSchema, S extends keyof T> = UnstableBuilder<T, S, RestSchema>
