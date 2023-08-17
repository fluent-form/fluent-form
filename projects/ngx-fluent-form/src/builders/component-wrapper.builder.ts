import { AnyComponentWrapperSchema, ButtonGroupComponentSchema, SchemaKey } from '../schemas';
import { Builder, builder, UnstableBuilder } from '../utils';
import { KindOrKey, RestSchema, REST_SCHEMA } from './helper';

function componentWrapperBuilder<T extends AnyComponentWrapperSchema>(): Builder<T, RestSchema> {
  return builder<T, RestSchema>(REST_SCHEMA);
}

export function buttonGroup<Key extends SchemaKey>(key?: Key): UnstableComponentWrapperBuilder<ButtonGroupComponentSchema<Key>, KindOrKey> {
  return componentWrapperBuilder<ButtonGroupComponentSchema<Key>>().kind('button-group').key(key);
}

export type UnstableComponentWrapperBuilder<T extends AnyComponentWrapperSchema, S extends keyof T> = UnstableBuilder<T, S, RestSchema>;
