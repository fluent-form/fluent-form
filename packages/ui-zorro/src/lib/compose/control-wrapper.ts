import { SingleSchemaKey, UnstableBuilder, composeBuilder } from '@fluent-form/core';
import { SpaceCompactComponentSchema, SpaceComponentSchema, TableColumnSchema } from '../schemas';
import { KindOrKey } from './helper';

export function space<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<SpaceComponentSchema<Key>, KindOrKey> {
  return composeBuilder<SpaceComponentSchema<Key>>().kind('space').key(key);
}

export function spaceCompact<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<SpaceCompactComponentSchema<Key>, KindOrKey> {
  return composeBuilder<SpaceCompactComponentSchema<Key>>().kind('space-compact').key(key);
}

export function tableColumn<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<TableColumnSchema<Key>, KindOrKey> {
  return composeBuilder<TableColumnSchema<Key>>().kind('table-column').key(key);
}
