import { SingleSchemaKey, UnstableBuilder, composeBuilder } from '@fluent-form/core';
import { SpaceCompactComponentSchema, SpaceComponentSchema } from '../schemas';
import { KindOrKey } from './helper';

export function space<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<SpaceComponentSchema<Key>, KindOrKey> {
  return composeBuilder<SpaceComponentSchema<Key>>().kind('space').key(key);
}

export function spaceCompact<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<SpaceCompactComponentSchema<Key>, KindOrKey> {
  return composeBuilder<SpaceCompactComponentSchema<Key>>().kind('space-compact').key(key);
}
