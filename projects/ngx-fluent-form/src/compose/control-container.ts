import { SafeAny } from '@ngify/types';
import { AbstractControlContainerSchema, AnySchema, FormArraySchema, FormGroupSchema, SingleSchemaKey, TabsArraySchema } from '../schemas';
import { isArray, isFunction } from '../utils';
import { StableBuilder, UnstableBuilder, composeBuilder } from './compose-builder';
import { KindOrKey } from './helper';

export function group(): UnstableBuilder<FormGroupSchema<number>, KindOrKey>;
export function group<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<FormGroupSchema<Key>, KindOrKey>;
export function group<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<FormGroupSchema<Key>, KindOrKey> {
  return composeBuilder<FormGroupSchema<Key>>().kind('group').key(key);
}

export function array(): UnstableBuilder<FormArraySchema<number>, KindOrKey>;
export function array<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<FormArraySchema<Key>, KindOrKey>;
export function array<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<FormArraySchema<Key>, KindOrKey> {
  return composeBuilder<FormArraySchema<Key>>().kind('array').key(key);
}

export function tabsArray(): UnstableBuilder<TabsArraySchema<number>, KindOrKey>;
export function tabsArray<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<TabsArraySchema<Key>, KindOrKey>;
export function tabsArray<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<TabsArraySchema<Key>, KindOrKey> {
  return composeBuilder<TabsArraySchema<Key>>().kind('tabs-array').key(key);
}

export function form(composeFn: FormComposeFn): FormGroupSchema;
export function form(schemas: AnySchema[]): FormGroupSchema;
export function form(builder: StableBuilder<AbstractControlContainerSchema>): FormGroupSchema;
export function form(fnOrSchemasOrBuilder: AnySchema[] | FormComposeFn | StableBuilder<AbstractControlContainerSchema>): FormGroupSchema {
  if (isArray(fnOrSchemasOrBuilder)) {
    return {
      kind: 'group',
      key: 'root',
      schemas: fnOrSchemasOrBuilder,
    };
  }

  if (isFunction(fnOrSchemasOrBuilder)) {
    return group('root').schemas(fnOrSchemasOrBuilder).build();
  }

  const scheam = fnOrSchemasOrBuilder.build() as FormGroupSchema;
  scheam.key = 'root';

  return scheam;
}

type FormComposeFn = () => SafeAny;
