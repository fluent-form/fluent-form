import type { AnyObject, SafeAny } from '@ngify/core';

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
  // If a schema already exists, just push it in as a subschema.
  currentSchema?.schemas!.push(schmea);
}

const IS_BUILDER = Symbol();
const BUILD_KEY = 'build';

export function composeBuilder<T extends Record<string, SafeAny>>(): Builder<T> {
  const target: AnyObject = {};

  joinSchema(target);

  const builder = new Proxy(target, {
    get(target, property) {
      switch (property) {
        case IS_BUILDER: return true;
        case BUILD_KEY: return () => target;

        case COMPOSE_KEY:
          return (composeFn: (...args: SafeAny) => SafeAny): unknown => {
            target[COMPOSE_KEY] = [];

            enterSchema(target);

            try {
              composeFn(builder);
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
 * Determines whether the value is a builder.
 */
export function isBuilder<T = unknown>(value: SafeAny): value is StableBuilder<T> {
  return value[IS_BUILDER] ?? false;
}

type ComposeKey = typeof COMPOSE_KEY;
type BuildKey = typeof BUILD_KEY;
/** Get the non-nullable and required keys of an interface. */
type NonNullableKey<T> = {
  // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
  [K in keyof T]-?: Record<K, T[K]> extends { [_ in K]-?: T[K] } ? K : never
}[keyof T];

/**
 * @template T 原型
 * @template C 候选
 * @template N 必填字段
 * @template S 已选字段
 * @template B 可以构建
 */
export type Builder<
  T extends Record<string, SafeAny>,
  C extends keyof T = keyof T,
  N extends keyof T = NonNullableKey<T>,
  S extends keyof T = never,
  B extends BuildKey = never
> = {
  // 通过 `keyof Pick` 从原始类型 T 中提取出字段后再遍历就能够携带上字段在 T 中的注释
  [K in keyof Pick<T, Exclude<C, S> | B>]-?: (
    K extends BuildKey
      ? () => Pick<T, S>
      : (val: K extends ComposeKey ? (it: Builder<T>) => SafeAny : T[K]) => Builder<
        T,
        C,
        N,
        S | K,
        [N] extends [S | K] ? BuildKey : never
      >
  )
};

export type StableBuilder<T> = Record<BuildKey, () => T>;

/**
 * @template T 原型
 * @template S 已选字段
 * @template N 必填字段
 */
export type UnstableBuilder<
  T extends Record<string, SafeAny>,
  S extends keyof T,
  N extends keyof T = NonNullableKey<T>
> = Builder<
  T,
  keyof T,
  N,
  S,
  [N] extends [S] ? BuildKey : never
>;
