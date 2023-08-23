import { AnyObject, SafeAny } from '@ngify/types';

interface Schema {
  [k: string]: SafeAny;
  schemas?: Schema[];
}

const CHILDREN_KEY = 'schemas';
/** 用来维护嵌套 schema 的顺序 */
const STACK: Schema[] = [];

let currentSchema: Schema | undefined;

export function getCurrentSchema(): Schema | undefined {
  return currentSchema;
}

export function setCurrentSchema(schmea: Schema | undefined) {
  currentSchema = schmea;
}

const BUILDER = Symbol();
const BUILD_KEY = 'build';

export function composeBuilder<T>(): Builder<T> {
  const target: AnyObject = {};

  // 如果当前已经有了 schema，就直接 push 进去作为 subschema
  currentSchema?.schemas!.push(target);

  const builder = new Proxy(target, {
    get(target, property) {
      if (BUILD_KEY === property) {
        return () => target;
      }

      if (BUILDER === property) {
        return true;
      }

      return (arg: unknown): unknown => {
        // 处理 compose function
        if (property === CHILDREN_KEY) {
          if (currentSchema) {
            STACK.push(currentSchema);
          }
          currentSchema = target;

          target[property] = [];

          (arg as Function)();

          if (STACK.length) {
            currentSchema = STACK.pop();
          }
        } else if (arg !== target[property]) {
          target[property] = arg;
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
  return value[BUILDER] ?? false;
}

type ChildrenKey = typeof CHILDREN_KEY;
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
      : (val: K extends ChildrenKey ? () => SafeAny : T[K]) => _Builder<
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
