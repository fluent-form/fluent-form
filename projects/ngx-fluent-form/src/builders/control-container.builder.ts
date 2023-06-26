import { SafeAny } from '@ngify/types';
import { AnyBuilder, AnyControlContainerSchema, AnySchema, FormArraySchema, FormGroupSchema, SchemaKey, StandardSchema } from '../schemas';
import { Builder, builder, StableBuilder, standardSchema, standardSchemas, UnstableBuilder } from '../utils';
import { KindOrKey } from './helper';

const REST_PARAMS = ['schemas', 'validators', 'asyncValidators'] as const;

function controlContainerBuilder<T extends AnyControlContainerSchema>(): Builder<T, RestSchema> {
  return builder<T, RestSchema>(REST_PARAMS);
}

/**
 * 是否为表单构建器函数元组
 * @param arr
 */
function isFormFactoryFnTuple(arr: SafeAny[]): arr is [FormBuilderFn] {
  return arr[0] instanceof Function;
}

export function form(factory: FormBuilderFn): StandardSchema<FormGroupSchema>;
export function form(...schemas: AnySchema[]): StandardSchema<AnySchema>[];
export function form(...builders: AnyBuilder[]): StandardSchema<AnySchema>[];
export function form(...schemasOrBuilders: AnySchema[] | AnyBuilder[]): StandardSchema<AnySchema>[];
export function form(...fnOrSchemasOrBuilder: AnySchema[] | AnyBuilder[] | [FormBuilderFn]): StandardSchema<AnySchema>[] | StandardSchema<FormGroupSchema> {
  if (isFormFactoryFnTuple(fnOrSchemasOrBuilder)) {
    const [factory] = fnOrSchemasOrBuilder;
    return standardSchema(factory(group()));
  }

  return standardSchemas(fnOrSchemasOrBuilder);
}

export function group(): UnstableControlContainerBuilder<FormGroupSchema<number>, KindOrKey>;
export function group<Key extends SchemaKey>(key?: Key): UnstableControlContainerBuilder<FormGroupSchema<Key>, KindOrKey>;
export function group<Key extends SchemaKey>(key?: Key) {
  return controlContainerBuilder<FormGroupSchema<Key>>().kind('group').key(key);
}

export function array(): UnstableControlContainerBuilder<FormArraySchema<number>, KindOrKey>;
export function array<Key extends SchemaKey>(key?: Key): UnstableControlContainerBuilder<FormArraySchema<Key>, KindOrKey>;
export function array<Key extends SchemaKey>(key?: Key) {
  return controlContainerBuilder<FormArraySchema<Key>>().kind('array').key(key);
}

type FormBuilderFn = (it: UnstableControlContainerBuilder<FormGroupSchema, KindOrKey>) => StableBuilder<FormGroupSchema>;
type RestSchema = typeof REST_PARAMS[number];

export type UnstableControlContainerBuilder<T extends AnyControlContainerSchema, S extends keyof T> = UnstableBuilder<T, S, RestSchema>;
