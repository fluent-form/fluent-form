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

/**
 * @template T 原型
 * @template B 已选
 * @template U 未选
 * @template R 可以 Rest 参数的属性名
 */
export type Builder<T, B = {}, U = T, R extends string = typeof REST_PARAMETERS[number]> = (B extends T ? { build: () => T } : unknown) & {
  [P in keyof U]-?: (
    P extends R
    ? (
      // 兼容可选的剩余参数
      U[P] extends (undefined | SafeAny[])
      ? (...o: NonNullable<U[P]>) => Builder<T, B & Record<P, U[P]>, Omit<U, P>, R>
      : never
    )
    : (o: U[P]) => Builder<T, B & Record<P, U[P]>, Omit<U, P>, R>
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
