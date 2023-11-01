import { SafeAny } from '@ngify/types';
import { AnySchema, FormArraySchema, FormGroupSchema, SchemaKey } from '../schemas';
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

export function form(composeFn: FormComposeFn, config?: FormConfig): FormGroupSchema;
export function form(schemas: AnySchema[], config?: FormConfig): FormGroupSchema;
export function form(fnOrSchemas: AnySchema[] | FormComposeFn, config?: FormConfig): FormGroupSchema {
  if (Array.isArray(fnOrSchemas)) {
    return {
      kind: 'group',
      key: 'root',
      schemas: fnOrSchemas,
      ...config
    };
  }

  const schema = group('root').schemas(fnOrSchemas).build();

  if (config) {
    Object.assign(schema, config);
  }

  return schema as FormGroupSchema;
}

type FormComposeFn = () => SafeAny;
type FormConfig = Omit<FormGroupSchema, KindOrKey | 'label' | 'schemas'>;
