import { RowComponentSchema, SingleSchemaKey, UnstableBuilder, composeBuilder } from '@fluent-form/core';
import { StepComponentSchema, StepsComponentSchema, TabComponentSchema, TabsComponentSchema } from '../schemas';
import { KindOrKey } from './helper';

export function steps<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<StepsComponentSchema<Key>, KindOrKey> {
  return composeBuilder<StepsComponentSchema<Key>>().kind('steps').key(key);
}

export function step<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<StepComponentSchema<Key>, KindOrKey> {
  return composeBuilder<StepComponentSchema<Key>>().kind('step').key(key);
}

export function tabs<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<TabsComponentSchema<Key>, KindOrKey> {
  return composeBuilder<TabsComponentSchema<Key>>().kind('tabs').key(key);
}

export function tab<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<TabComponentSchema<Key>, KindOrKey> {
  return composeBuilder<TabComponentSchema<Key>>().kind('tab').key(key);
}

export function row<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<RowComponentSchema<Key>, KindOrKey> {
  return composeBuilder<RowComponentSchema<Key>>().kind('row').key(key);
}
