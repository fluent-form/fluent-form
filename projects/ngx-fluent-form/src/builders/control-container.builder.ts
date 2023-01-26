import { SafeAny } from '@ngify/types';
import { AbstractSchema, AnyBuilder, AnyControlContainerSchema, AnySchema, AnySchemaName, FormArraySchema, FormGroupSchema, SchemaName } from '../schemas';
import { Builder, builder, StableBuilder, standardSchema, standardSchemas, UnstableBuilder } from '../utils';
import { KindAndName } from './helper';

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
    const builder = group() as UnstableBuilder<FormGroupSchema<number>, keyof AbstractSchema<AnySchemaName>, RestSchema>;
    const schema = fn(builder);
    return standardSchema(schema);
  }

  return standardSchemas(fnOrSchemas);
}

export function group(): UnstableControlContainerBuilder<FormGroupSchema<number>, KindAndName>;
export function group<N extends SchemaName>(name?: N): UnstableControlContainerBuilder<FormGroupSchema<N>, KindAndName>;
export function group<N extends SchemaName>(name?: N) {
  return controlContainerBuilder<FormGroupSchema<N>>().kind('group').name(name);
}

export function array(): UnstableControlContainerBuilder<FormArraySchema<number>, KindAndName>;
export function array<N extends SchemaName>(name?: N): UnstableControlContainerBuilder<FormArraySchema<N>, KindAndName>;
export function array<N extends SchemaName>(name?: N) {
  return controlContainerBuilder<FormArraySchema<N>>().kind('array').name(name);
}

type FormBuilderFn = (it: UnstableBuilder<FormGroupSchema, keyof AbstractSchema<AnySchemaName>, RestSchema>) => StableBuilder<FormGroupSchema>;
type RestSchema = typeof REST_PARAMS[number];
type UnstableControlContainerBuilder<T extends AnyControlContainerSchema, S extends keyof T> = UnstableBuilder<T, S, RestSchema>;
