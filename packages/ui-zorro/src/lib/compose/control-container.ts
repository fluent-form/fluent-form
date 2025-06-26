import { SingleSchemaKey, UnstableBuilder, applyRoot, composeBuilder } from '@fluent-form/core';
import { CardsArraySchema, FormArraySchema, FormGroupSchema, TableArraySchema, TableRowGroupSchema, TabsArraySchema } from '../schemas';
import { KindOrKey } from './helper';

export function group(): UnstableBuilder<FormGroupSchema<number>, KindOrKey>;
export function group<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<FormGroupSchema<Key>, KindOrKey>;
export function group<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<FormGroupSchema<Key>, KindOrKey> {
  return composeBuilder<FormGroupSchema<Key>>().kind('group').key(key);
}

export function tableRowGroup(): UnstableBuilder<TableRowGroupSchema<number>, KindOrKey>;
export function tableRowGroup<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<TableRowGroupSchema<Key>, KindOrKey>;
export function tableRowGroup<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<TableRowGroupSchema<Key>, KindOrKey> {
  return composeBuilder<TableRowGroupSchema<Key>>().kind('table-row-group').key(key);
}

export function array(): UnstableBuilder<FormArraySchema<number>, KindOrKey>;
export function array<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<FormArraySchema<Key>, KindOrKey>;
export function array<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<FormArraySchema<Key>, KindOrKey> {
  return composeBuilder<FormArraySchema<Key>>().kind('array').key(key);
}

export function tableArray(): UnstableBuilder<TableArraySchema<number>, KindOrKey>;
export function tableArray<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<TableArraySchema<Key>, KindOrKey>;
export function tableArray<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<TableArraySchema<Key>, KindOrKey> {
  return composeBuilder<TableArraySchema<Key>>().kind('table-array').key(key);
}

export function tabsArray(): UnstableBuilder<TabsArraySchema<number>, KindOrKey>;
export function tabsArray<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<TabsArraySchema<Key>, KindOrKey>;
export function tabsArray<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<TabsArraySchema<Key>, KindOrKey> {
  return composeBuilder<TabsArraySchema<Key>>().kind('tabs-array').key(key);
}

export function cardsArray(): UnstableBuilder<CardsArraySchema<number>, KindOrKey>;
export function cardsArray<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<CardsArraySchema<Key>, KindOrKey>;
export function cardsArray<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<CardsArraySchema<Key>, KindOrKey> {
  return composeBuilder<CardsArraySchema<Key>>().kind('cards-array').key(key);
}

export function applyGroup(schema: Partial<Omit<FormGroupSchema, 'schemas'>>) {
  return applyRoot(schema);
}
