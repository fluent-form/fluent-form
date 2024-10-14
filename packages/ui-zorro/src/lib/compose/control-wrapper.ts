import { SingleSchemaKey, UnstableBuilder, composeBuilder } from '@fluent-form/core';
import { InputAddonComponentSchema, InputGroupComponentSchema, SpaceCompactComponentSchema, SpaceComponentSchema } from '../schemas';
import { KindOrKey } from './helper';

export function inputGroup<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<InputGroupComponentSchema<Key>, KindOrKey> {
  return composeBuilder<InputGroupComponentSchema<Key>>().kind('input-group').key(key);
}

export function inputAddon<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<InputAddonComponentSchema<Key>, KindOrKey> {
  return composeBuilder<InputAddonComponentSchema<Key>>().kind('input-addon').key(key);
}

export function space<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<SpaceComponentSchema<Key>, KindOrKey> {
  return composeBuilder<SpaceComponentSchema<Key>>().kind('space').key(key);
}

export function spaceCompact<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<SpaceCompactComponentSchema<Key>, KindOrKey> {
  return composeBuilder<SpaceCompactComponentSchema<Key>>().kind('space-compact').key(key);
}
