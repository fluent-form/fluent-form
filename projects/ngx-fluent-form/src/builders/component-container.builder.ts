import { AnyComponentContainerSchema, SchemaName, StepComponentSchema, StepsComponentSchema, TabComponentSchema, TabsComponentSchema } from '../schemas';
import { Builder, builder, UnstableBuilder } from '../utils';
import { KindAndName, RestSchema, REST_SCHEMA } from './helper';

function componentContainerBuilder<T extends AnyComponentContainerSchema>(): Builder<T, RestSchema> {
  return builder<T, RestSchema>(REST_SCHEMA);
}

export function steps<N extends SchemaName>(name?: N): UnstableComponentContainerBuilder<StepsComponentSchema<N>, KindAndName> {
  return componentContainerBuilder<StepsComponentSchema<N>>().kind('steps').name(name);
}

export function step<N extends SchemaName>(name?: N): UnstableComponentContainerBuilder<StepComponentSchema<N>, KindAndName> {
  return componentContainerBuilder<StepComponentSchema<N>>().kind('step').name(name);
}

export function tabs<N extends SchemaName>(name?: N): UnstableComponentContainerBuilder<TabsComponentSchema<N>, KindAndName> {
  return componentContainerBuilder<TabsComponentSchema<N>>().kind('tabs').name(name);
}

export function tab<N extends SchemaName>(name?: N): UnstableComponentContainerBuilder<TabComponentSchema<N>, KindAndName> {
  return componentContainerBuilder<TabComponentSchema<N>>().kind('tab').name(name);
}

type UnstableComponentContainerBuilder<T extends AnyComponentContainerSchema, S extends keyof T> = UnstableBuilder<T, S, RestSchema>;
