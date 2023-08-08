import { AnyComponentContainerSchema, RowComponentSchema, SchemaKey, SpaceComponentSchema, StepComponentSchema, StepsComponentSchema, TabComponentSchema, TabsComponentSchema } from '../schemas';
import { Builder, builder, UnstableBuilder } from '../utils';
import { KindOrKey, RestSchema, REST_SCHEMA } from './helper';

function componentContainerBuilder<T extends AnyComponentContainerSchema>(): Builder<T, RestSchema> {
  return builder<T, RestSchema>(REST_SCHEMA);
}

export function steps<Key extends SchemaKey>(key?: Key): UnstableComponentContainerBuilder<StepsComponentSchema<Key>, KindOrKey> {
  return componentContainerBuilder<StepsComponentSchema<Key>>().kind('steps').key(key);
}

export function step<Key extends SchemaKey>(key?: Key): UnstableComponentContainerBuilder<StepComponentSchema<Key>, KindOrKey> {
  return componentContainerBuilder<StepComponentSchema<Key>>().kind('step').key(key);
}

export function tabs<Key extends SchemaKey>(key?: Key): UnstableComponentContainerBuilder<TabsComponentSchema<Key>, KindOrKey> {
  return componentContainerBuilder<TabsComponentSchema<Key>>().kind('tabs').key(key);
}

export function tab<Key extends SchemaKey>(key?: Key): UnstableComponentContainerBuilder<TabComponentSchema<Key>, KindOrKey> {
  return componentContainerBuilder<TabComponentSchema<Key>>().kind('tab').key(key);
}

export function row<Key extends SchemaKey>(key?: Key): UnstableComponentContainerBuilder<RowComponentSchema<Key>, KindOrKey> {
  return componentContainerBuilder<RowComponentSchema<Key>>().kind('row').key(key);
}

export function space<Key extends SchemaKey>(key?: Key): UnstableComponentContainerBuilder<SpaceComponentSchema<Key>, KindOrKey> {
  return componentContainerBuilder<SpaceComponentSchema<Key>>().kind('space').key(key);
}

export type UnstableComponentContainerBuilder<T extends AnyComponentContainerSchema, S extends keyof T> = UnstableBuilder<T, S, RestSchema>;
