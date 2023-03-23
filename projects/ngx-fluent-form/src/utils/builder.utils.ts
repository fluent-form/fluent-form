import { AnyObject, SafeAny } from '@ngify/types';

const BUILDER = Symbol('BUILDER');

export function builder<T>(): Builder<T>
export function builder<T, R extends keyof T>(rests: readonly R[]): Builder<T, R>
export function builder<T, R extends keyof T>(rests?: readonly R[]): Builder<T, R> {
  const builder = new Proxy({} as AnyObject, {
    get(target, property) {
      if ('build' === property) {
        return () => target;
      }

      if (BUILDER === property) {
        return true;
      }

      if (rests?.includes(property as R)) {
        return (...args: unknown[]): unknown => {
          target[property] = args;
          return builder;
        };
      }

      return (arg: unknown): unknown => {
        if (arg !== target[property]) {
          target[property] = arg;
        }
        return builder;
      };
    }
  });

  return builder as Builder<T, R>;
}

/**
 * 是否为一个构建器
 * @param value
 */
export const isBuilder = <T = unknown>(value: SafeAny): value is StableBuilder<T> => value[BUILDER] ?? false;

/** 剩余参数类型 */
type RestParams = undefined | SafeAny[];
type BuildKey = 'build';
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
 * @template R 剩余参数字段
 * @template B 可以构建
 */
type _Builder<
  T extends Buildable,
  C extends keyof T,
  N extends keyof T,
  S extends keyof T = never,
  R extends keyof T = never,
  B extends BuildKey = never
> = {
    // 通过 `keyof Pick` 从原始类型 T 中提取出字段后再遍历就能够携带上字段在 T 中的注释
    [K in keyof Pick<T, Exclude<C, S> | B>]-?: (
      K extends BuildKey
      ? () => Pick<T, S>
      : K extends R
      ? (...vals: T[K] extends RestParams ? NonNullable<T[K]> : never) => _Builder<
        T,
        C,
        N,
        S | K,
        R,
        [N] extends [S | K] ? BuildKey : never
      >
      : (val: T[K]) => _Builder<
        T,
        C,
        N,
        S | K,
        R,
        [N] extends [S | K] ? BuildKey : never
      >
    )
  };

/**
 * @template T 原型
 * @template R 剩余参数字段
 */
export type Builder<T, R extends keyof T = never> = _Builder<
  T & Buildable,
  keyof T,
  NonNullableKey<T>,
  never,
  R
>;

export type StableBuilder<T> = Record<BuildKey, () => T>;

/**
 * @template T 原型
 * @template S 已选字段
 * @template R 剩余参数字段
 * @template N 必填字段
 */
export type UnstableBuilder<
  T,
  S extends keyof T,
  R extends keyof T = never,
  N extends keyof T = NonNullableKey<T>
> = _Builder<
  T & Buildable,
  keyof T,
  N,
  S,
  R,
  [N] extends [S] ? BuildKey : never
>;
