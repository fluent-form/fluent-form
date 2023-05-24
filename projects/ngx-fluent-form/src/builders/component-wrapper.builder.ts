import { AnyComponentWrapperSchema, ButtonGroupComponentSchema } from '../schemas';
import { SchemaName } from '../schemas/types';
import { Builder, builder, UnstableBuilder } from '../utils';
import { isEmptyArray, isSchemaNameTuple, KindOrKey, KindOrSchemas, RestSchema, REST_SCHEMA } from './helper';

function componentWrapperBuilder<T extends AnyComponentWrapperSchema>(): Builder<T, RestSchema> {
  return builder<T, RestSchema>(REST_SCHEMA);
}

export function buttonGroup<N extends SchemaName>(key?: N): UnstableComponentWrapperBuilder<ButtonGroupComponentSchema<N>, KindOrKey>;
export function buttonGroup(...schemas: ButtonGroupComponentSchema['schemas']): UnstableComponentWrapperBuilder<ButtonGroupComponentSchema, KindOrSchemas>;
export function buttonGroup(...keyOrSchemas: [] | [SchemaName] | ButtonGroupComponentSchema['schemas']) {
  if (isEmptyArray(keyOrSchemas) || isSchemaNameTuple(keyOrSchemas)) {
    return componentWrapperBuilder<ButtonGroupComponentSchema>().kind('button-group').key(keyOrSchemas[0]);
  }

  return componentWrapperBuilder<ButtonGroupComponentSchema>().kind('button-group').schemas(...keyOrSchemas);
}

export type UnstableComponentWrapperBuilder<T extends AnyComponentWrapperSchema, S extends keyof T> = UnstableBuilder<T, S, RestSchema>;
