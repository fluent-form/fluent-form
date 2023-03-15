import { AnyComponentWrapperSchema, ButtonGroupComponentSchema } from '../schemas';
import { SchemaName } from '../schemas/types';
import { Builder, UnstableBuilder, builder } from '../utils';
import { KindOrName, KindOrSchemas, REST_SCHEMA, RestSchema, isEmptyArray, isSchemaNameTuple } from './helper';

function componentWrapperBuilder<T extends AnyComponentWrapperSchema>(): Builder<T, RestSchema> {
  return builder<T, RestSchema>(REST_SCHEMA);
}

export function buttonGroup<N extends SchemaName>(name?: N): UnstableComponentWrapperBuilder<ButtonGroupComponentSchema<N>, KindOrName>;
export function buttonGroup(...schemas: ButtonGroupComponentSchema['schemas']): UnstableComponentWrapperBuilder<ButtonGroupComponentSchema, KindOrSchemas>;
export function buttonGroup(...nameOrSchemas: [] | [SchemaName] | ButtonGroupComponentSchema['schemas']) {
  if (isEmptyArray(nameOrSchemas) || isSchemaNameTuple(nameOrSchemas)) {
    return componentWrapperBuilder<ButtonGroupComponentSchema>().kind('button-group').name(nameOrSchemas[0]);
  }

  return componentWrapperBuilder<ButtonGroupComponentSchema>().kind('button-group').schemas(...nameOrSchemas);
}

export type UnstableComponentWrapperBuilder<T extends AnyComponentWrapperSchema, S extends keyof T> = UnstableBuilder<T, S, RestSchema>;
