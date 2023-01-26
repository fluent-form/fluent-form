import { SafeAny } from '@ngify/types';
import { AnyObject } from '../types';

const IS_BUILDER_KEY = '__is_builder__';

export function builder<T>(): Builder<T>
export function builder<T, R extends keyof T>(rests: readonly R[]): Builder<T, R>
export function builder<T, R extends keyof T>(rests?: readonly R[]): Builder<T, R> {
  const builder = new Proxy({} as AnyObject, {
    get(target, prop: string) {
      if ('build' === prop) {
        return () => target;
      }

      if (IS_BUILDER_KEY === prop) {
        return true;
      }

      if (rests?.includes(prop as R)) {
        return (...args: unknown[]): unknown => {
          target[prop] = args;
          return builder;
        };
      }

      return (arg: unknown): unknown => {
        if (arg !== target[prop]) {
          target[prop] = arg;
        }
        return builder;
      };
    }
  });

  return builder as Builder<T, R>;
}

/**
 * 是否为一个构建器
 * @param builder
 */
export const isBuilder = <T = unknown>(builder: SafeAny): builder is StableBuilder<T> => builder[IS_BUILDER_KEY];

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
    [K in Exclude<C, S> | B]: (
      K extends BuildKey
      ? () => { [K in S]: T[K] }
      : K extends R
      ? (...values: T[K] extends RestParams ? NonNullable<T[K]> : never) => _Builder<
        T,
        C,
        N,
        S | K,
        R,
        [N] extends [S | K] ? BuildKey : never
      >
      : (value: T[K]) => _Builder<
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
