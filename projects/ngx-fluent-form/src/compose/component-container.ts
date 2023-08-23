import { RowComponentSchema, SchemaKey, SpaceComponentSchema, StepComponentSchema, StepsComponentSchema, TabComponentSchema, TabsComponentSchema } from '../schemas';
import { composeBuilder, UnstableBuilder } from './compose-builder';
import { KindOrKey } from './helper';

export function steps<Key extends SchemaKey>(key?: Key): UnstableBuilder<StepsComponentSchema<Key>, KindOrKey> {
  return composeBuilder<StepsComponentSchema<Key>>().kind('steps').key(key);
}

export function step<Key extends SchemaKey>(key?: Key): UnstableBuilder<StepComponentSchema<Key>, KindOrKey> {
  return composeBuilder<StepComponentSchema<Key>>().kind('step').key(key);
}

export function tabs<Key extends SchemaKey>(key?: Key): UnstableBuilder<TabsComponentSchema<Key>, KindOrKey> {
  return composeBuilder<TabsComponentSchema<Key>>().kind('tabs').key(key);
}

export function tab<Key extends SchemaKey>(key?: Key): UnstableBuilder<TabComponentSchema<Key>, KindOrKey> {
  return composeBuilder<TabComponentSchema<Key>>().kind('tab').key(key);
}

export function row<Key extends SchemaKey>(key?: Key): UnstableBuilder<RowComponentSchema<Key>, KindOrKey> {
  return composeBuilder<RowComponentSchema<Key>>().kind('row').key(key);
}

export function space<Key extends SchemaKey>(key?: Key): UnstableBuilder<SpaceComponentSchema<Key>, KindOrKey> {
  return composeBuilder<SpaceComponentSchema<Key>>().kind('space').key(key);
}
