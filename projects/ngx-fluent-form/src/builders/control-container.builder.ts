import { SafeAny } from '@ngify/types';
import { AnyBuilder, AnyControlContainerSchema, AnySchema, FormArraySchema, FormGroupSchema } from '../schemas';
import { SchemaKey } from '../schemas/types';
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
function isFormBuilderFnTuple(arr: SafeAny[]): arr is [FormBuilderFn] {
  return arr[0] instanceof Function;
}

export function form(fn: FormBuilderFn): FormGroupSchema;
export function form(...schemas: (AnySchema | AnyBuilder)[]): AnySchema[];
export function form(...fnOrSchemas: (AnySchema | AnyBuilder)[] | [FormBuilderFn]): AnySchema[] | FormGroupSchema {
  if (isFormBuilderFnTuple(fnOrSchemas)) {
    const [fn] = fnOrSchemas;
    const builder = group();
    const schema = fn(builder);
    return standardSchema(schema);
  }

  return standardSchemas(fnOrSchemas);
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
