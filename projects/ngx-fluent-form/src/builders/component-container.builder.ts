import { AnyComponentContainerSchema, RowComponentSchema, StepComponentSchema, StepsComponentSchema, TabComponentSchema, TabsComponentSchema } from '../schemas';
import { SchemaName } from '../schemas/types';
import { Builder, builder, UnstableBuilder } from '../utils';
import { KindOrKey, RestSchema, REST_SCHEMA } from './helper';

function componentContainerBuilder<T extends AnyComponentContainerSchema>(): Builder<T, RestSchema> {
  return builder<T, RestSchema>(REST_SCHEMA);
}

export function steps<N extends SchemaName>(key?: N): UnstableComponentContainerBuilder<StepsComponentSchema<N>, KindOrKey> {
  return componentContainerBuilder<StepsComponentSchema<N>>().kind('steps').key(key);
}

export function step<N extends SchemaName>(key?: N): UnstableComponentContainerBuilder<StepComponentSchema<N>, KindOrKey> {
  return componentContainerBuilder<StepComponentSchema<N>>().kind('step').key(key);
}

export function tabs<N extends SchemaName>(key?: N): UnstableComponentContainerBuilder<TabsComponentSchema<N>, KindOrKey> {
  return componentContainerBuilder<TabsComponentSchema<N>>().kind('tabs').key(key);
}

export function tab<N extends SchemaName>(key?: N): UnstableComponentContainerBuilder<TabComponentSchema<N>, KindOrKey> {
  return componentContainerBuilder<TabComponentSchema<N>>().kind('tab').key(key);
}

export function row<N extends SchemaName>(key?: N): UnstableComponentContainerBuilder<RowComponentSchema<N>, KindOrKey> {
  return componentContainerBuilder<RowComponentSchema<N>>().kind('row').key(key);
}

export type UnstableComponentContainerBuilder<T extends AnyComponentContainerSchema, S extends keyof T> = UnstableBuilder<T, S, RestSchema>;
