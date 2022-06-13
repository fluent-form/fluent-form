export function builder<T>(): Builder<T> {
  const builder = new Proxy({} as Record<string, unknown>, {
    get(target, prop: string) {
      if ('build' === prop) {
        return () => target;
      }

      return (arg: unknown): unknown => {
        target[prop] = arg;
        return builder as Builder<T>;
      };
    }
  });

  return builder as Builder<T>;
}

/**
 * @template T 原型
 * @template B 已选
 * @template U 未选
 */
export type Builder<T, B = unknown, U = T> = (B extends T ? Record<'build', () => T> : unknown) & {
  [P in keyof U]-?: (o: U[P]) => Builder<T, B & Record<P, U[P]>, Omit<U, P>>
};

/**
 * 是否为一个构建器
 * @param builder
 */
export const isBuilder = <T = unknown>(builder: any): builder is Builder<T> => (
  typeof builder.build === 'function'
);
