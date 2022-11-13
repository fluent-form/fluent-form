import { SafeAny } from '@ngify/types';
import { AnyObject } from '../types';

const REST_PARAMETERS = ['schemas', 'validators', 'asyncValidators'] as const;

export function builder<T>(target: Partial<T> = {}): Builder<T> {
  const builder = new Proxy(target as AnyObject, {
    get(target, prop: string) {
      if ('build' === prop) {
        return () => target;
      }

      if (REST_PARAMETERS.includes(prop as typeof REST_PARAMETERS[number])) {
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

  return builder as Builder<T>;
}

type Buildable<T> = { build: () => T };
type RestParams = undefined | SafeAny[];
type DefaultRestParamsName = typeof REST_PARAMETERS[number];

/**
 * @template T target 原型
 * @template S selected 已选
 * @template C candidate 候选
 * @template R rest 剩余参数名
 */
export type Builder<T, S = {}, C = T, R extends string = DefaultRestParamsName> = (S extends T ? Buildable<T> : unknown) & {
  [P in keyof C]-?: (
    P extends R
    ? (
      C[P] extends RestParams
      ? (...o: NonNullable<C[P]>) => Builder<T, S & Record<P, C[P]>, Omit<C, P>, R>
      : never
    )
    : (o: C[P]) => Builder<T, S & Record<P, C[P]>, Omit<C, P>, R>
  )
};

/**
 * 稳定的 Builder
 * @template T 原型
 */
export type StableBuilder<T> = Builder<T, T, {}>;

/**
 * 不稳定的 Builder，还有必填字段未填
 * @template T 原型
 * @template K 已填字段
 */
export type UnstableBuilder<T, K extends keyof T> = Builder<T, Pick<T, K>, Omit<T, K>>;

/**
 * 是否为一个构建器
 * @param builder
 */
export const isBuilder = <T = unknown>(builder: SafeAny): builder is Builder<T> => (
  typeof builder.build === 'function'
);
