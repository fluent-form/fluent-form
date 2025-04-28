import { AnyObject, SafeAny } from '@ngify/types';

interface Schema {
  [k: string]: SafeAny;
  schemas?: Schema[];
}

const COMPOSE_KEY = 'schemas';
const SCHEMA_STACK: Schema[] = [];

function getCurrentSchema(): Schema | undefined {
  return SCHEMA_STACK[SCHEMA_STACK.length - 1];
}

function enterSchema(schmea: Schema) {
  SCHEMA_STACK.push(schmea);
}

function leaveSchema() {
  SCHEMA_STACK.pop();
}

function joinSchema(schmea: Schema) {
  const currentSchema = getCurrentSchema();
  // 如果当前已经有了 schema，就直接 push 进去作为 subschema
  currentSchema?.schemas!.push(schmea);
}

export function applyRoot(schema: Schema) {
  const currentSchema = getCurrentSchema()!;
  Object.assign(currentSchema, schema);
}

const IS_BUILDER = Symbol();
const BUILD_KEY = 'build';

export function composeBuilder<T>(): Builder<T> {
  const target: AnyObject = {};

  joinSchema(target);

  const builder = new Proxy(target, {
    get(target, property) {
      switch (property) {
        case IS_BUILDER: return true;
        case BUILD_KEY: return () => target;

        case COMPOSE_KEY:
          return (composeFn: Function): unknown => {
            target[COMPOSE_KEY] = [];

            enterSchema(target);

            try {
              composeFn();
            } finally {
              leaveSchema();
            }

            return builder;
          };
      }

      return (value: unknown): unknown => {
        if (value !== target[property]) {
          target[property] = value;
        }
        return builder;
      };
    }
  });

  return builder as Builder<T>;
}

/**
 * 是否为一个构建器
 * @param value
 */
export function isBuilder<T = unknown>(value: SafeAny): value is StableBuilder<T> {
  return value[IS_BUILDER] ?? false;
}

type ComposeKey = typeof COMPOSE_KEY;
type BuildKey = typeof BUILD_KEY;
type Buildable = Record<BuildKey, unknown>;
/** 取得接口的非空必填字段 */
type NonNullableKey<T> = {
  [K in keyof T]-?: { [_ in K]: T[K] } extends { [_ in K]-?: T[K] } ? K : never
}[keyof T];

/**
 * @template T 原型
 * @template C 候选
 * @template N 必填字段
 * @template S 已选字段
 * @template B 可以构建
 */
type _Builder<
  T extends Buildable,
  C extends keyof T,
  N extends keyof T,
  S extends keyof T = never,
  B extends BuildKey = never
> = {
    // 通过 `keyof Pick` 从原始类型 T 中提取出字段后再遍历就能够携带上字段在 T 中的注释
    [K in keyof Pick<T, Exclude<C, S> | B>]-?: (
      K extends BuildKey
      ? () => Pick<T, S>
      : (val: K extends ComposeKey ? () => SafeAny : T[K]) => _Builder<
        T,
        C,
        N,
        S | K,
        [N] extends [S | K] ? BuildKey : never
      >
    )
  };

/**
 * @template T 原型
 */
export type Builder<T> = _Builder<
  T & Buildable,
  keyof T,
  NonNullableKey<T>
>;

export type StableBuilder<T> = Record<BuildKey, () => T>;

/**
 * @template T 原型
 * @template S 已选字段
 * @template N 必填字段
 */
export type UnstableBuilder<
  T,
  S extends keyof T,
  N extends keyof T = NonNullableKey<T>
> = _Builder<
  T & Buildable,
  keyof T,
  N,
  S,
  [N] extends [S] ? BuildKey : never
>;
