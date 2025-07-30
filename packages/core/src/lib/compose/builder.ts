import type { AnyObject, SafeAny } from '@ngify/core';

interface Schema {
  [k: string]: SafeAny;
  schemas?: Schema[];
}

const COMPOSE_KEY = 'schemas';
const SCHEMA_STACK: Schema[] = [];

export function getCurrentSchema(): Schema | undefined {
  return SCHEMA_STACK[SCHEMA_STACK.length - 1];
}

function enterSchema(schema: Schema) {
  SCHEMA_STACK.push(schema);
}

function leaveSchema() {
  SCHEMA_STACK.pop();
}

function joinSchema(schema: Schema) {
  const currentSchema = getCurrentSchema();
  // If a schema already exists, just push it in as a subschema.
  currentSchema?.schemas!.push(schema);
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

type RequiredKey<T> = {
  [K in keyof T]-?: undefined extends T[K] ? never : K
}[keyof T];

type ComposeFn<T extends Record<string, SafeAny>> = (it: Builder<T>) => SafeAny;

/**
 * @template T 原型
 * @template TCandidateKey 候选
 * @template TRequiredKey 必填字段
 * @template TSelectedKey 已选字段
 */
export type Builder<
  T extends Record<string, SafeAny>,
  TCandidateKey extends keyof T = keyof T,
  TRequiredKey extends keyof T = RequiredKey<T>,
  TSelectedKey extends keyof T = never
> =
  {
    [K in keyof Pick<T, Exclude<TCandidateKey, TSelectedKey>>]-?: (
      (val: K extends ComposeKey ? ComposeFn<T> : T[K]) => Builder<
        T,
        TCandidateKey,
        TRequiredKey,
        TSelectedKey | K
      >
    )
  }
  &
  Record<[TRequiredKey] extends [TSelectedKey] ? BuildKey : never, () => Pick<T, TSelectedKey>>;

export type StableBuilder<T> = Record<BuildKey, () => T>;

/**
 * @template T 原型
 * @template TRequiredKey 必填字段
 * @template TSelectedKey 已选字段
 */
export type UnstableBuilder<
  T extends Record<string, SafeAny>,
  TSelectedKey extends keyof T,
  TRequiredKey extends keyof T = RequiredKey<T>
> = Builder<
  T,
  keyof T,
  TRequiredKey,
  TSelectedKey
>;
