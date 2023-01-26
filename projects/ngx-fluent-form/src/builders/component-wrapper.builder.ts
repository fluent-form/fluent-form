import { AnyComponentWrapperSchema, ButtonGroupComponentSchema, SchemaName } from '../schemas';
import { Builder, builder, UnstableBuilder } from '../utils';
import { KindAndName, RestSchema, REST_SCHEMA } from './helper';

function componentWrapperBuilder<T extends AnyComponentWrapperSchema>(): Builder<T, RestSchema> {
  return builder<T, RestSchema>(REST_SCHEMA);
}

export function buttonGroup<N extends SchemaName>(name?: N): UnstableComponentWrapperBuilder<ButtonGroupComponentSchema<N>, KindAndName> {
  return componentWrapperBuilder<ButtonGroupComponentSchema<N>>().kind('button-group').name(name);
}

type UnstableComponentWrapperBuilder<T extends AnyComponentWrapperSchema, S extends keyof T> = UnstableBuilder<T, S, RestSchema>;
