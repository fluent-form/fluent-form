import { SafeAny } from '@ngify/types';
import { AnySchema, FormArraySchema, FormGroupSchema, SchemaKey } from '../schemas';
import { isFunction } from '../utils';
import { composeBuilder, UnstableBuilder } from './compose-builder';
import { KindOrKey } from './helper';

export function group(): UnstableBuilder<FormGroupSchema<number>, KindOrKey>;
export function group<Key extends SchemaKey>(key?: Key): UnstableBuilder<FormGroupSchema<Key>, KindOrKey>;
export function group<Key extends SchemaKey>(key?: Key): UnstableBuilder<FormGroupSchema<Key>, KindOrKey> {
  return composeBuilder<FormGroupSchema<Key>>().kind('group').key(key);
}

export function array(): UnstableBuilder<FormArraySchema<number>, KindOrKey>;
export function array<Key extends SchemaKey>(key?: Key): UnstableBuilder<FormArraySchema<Key>, KindOrKey>;
export function array<Key extends SchemaKey>(key?: Key): UnstableBuilder<FormArraySchema<Key>, KindOrKey> {
  return composeBuilder<FormArraySchema<Key>>().kind('array').key(key);
}

export function form(composeFn: FormComposeFn): FormGroupSchema;
export function form(schemas: AnySchema[]): FormGroupSchema;
export function form(config: FormConfig, composeFn: FormComposeFn): FormGroupSchema;
export function form(config: FormConfig, schemas: AnySchema[]): FormGroupSchema;
export function form(fnOrSchemasOnConfig: FormComposeFn | AnySchema[] | FormConfig, fnOrSchemas?: FormComposeFn | AnySchema[]): FormGroupSchema {
  let config: FormConfig = {};

  if (Array.isArray(fnOrSchemasOnConfig) || isFunction(fnOrSchemasOnConfig)) {
    fnOrSchemas = fnOrSchemasOnConfig;
  } else {
    config = fnOrSchemasOnConfig;
  }

  if (Array.isArray(fnOrSchemas)) {
    return {
      kind: 'group',
      key: 'root',
      schemas: fnOrSchemas,
      ...config
    };
  }

  const schema = group('root').schemas(fnOrSchemas!).build() as FormGroupSchema;

  if (config) {
    Object.assign(schema, config);
  }

  return schema;
}

type FormComposeFn = () => SafeAny;
type FormConfig = Omit<FormGroupSchema, KindOrKey | 'label' | 'schemas'>;
