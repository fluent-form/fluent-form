import { SafeAny } from '@ngify/types';
import { Obj } from '../types';

export function builder<T>(): Builder<T> {
  const builder = new Proxy({} as Obj, {
    get(target, prop: string) {
      if ('build' === prop) {
        return () => target;
      }

      if ('schemas' === prop) {
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
 * @template R 需要 Rest 参数的属性名
 */
export type Builder<T, B = {}, U = T, R extends string = 'schemas'> = (B extends T ? { build: () => T } : unknown) & {
  [P in keyof U]-?: (
    P extends R ? (
      U[P] extends SafeAny[] ? (...o: U[P]) => Builder<T, B & Record<P, U[P]>, Omit<U, P>, R> : never
    ) :
    (o: U[P]) => Builder<T, B & Record<P, U[P]>, Omit<U, P>, R>
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
