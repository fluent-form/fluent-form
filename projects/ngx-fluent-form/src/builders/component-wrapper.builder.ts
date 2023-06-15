import { AnyComponentWrapperSchema, ButtonGroupComponentSchema, SchemaKey } from '../schemas';
import { Builder, builder, UnstableBuilder } from '../utils';
import { isEmptyArray, isSchemaKeyTuple, KindOrKey, KindOrSchemas, RestSchema, REST_SCHEMA } from './helper';

function componentWrapperBuilder<T extends AnyComponentWrapperSchema>(): Builder<T, RestSchema> {
  return builder<T, RestSchema>(REST_SCHEMA);
}

export function buttonGroup<Key extends SchemaKey>(key?: Key): UnstableComponentWrapperBuilder<ButtonGroupComponentSchema<Key>, KindOrKey>;
export function buttonGroup(...schemas: ButtonGroupComponentSchema['schemas']): UnstableComponentWrapperBuilder<ButtonGroupComponentSchema, KindOrSchemas>;
export function buttonGroup(...keyOrSchemas: [] | [SchemaKey] | ButtonGroupComponentSchema['schemas']) {
  if (isEmptyArray(keyOrSchemas) || isSchemaKeyTuple(keyOrSchemas)) {
    return componentWrapperBuilder<ButtonGroupComponentSchema>().kind('button-group').key(keyOrSchemas[0]);
  }

  return componentWrapperBuilder<ButtonGroupComponentSchema>().kind('button-group').schemas(...keyOrSchemas);
}

export type UnstableComponentWrapperBuilder<T extends AnyComponentWrapperSchema, S extends keyof T> = UnstableBuilder<T, S, RestSchema>;
