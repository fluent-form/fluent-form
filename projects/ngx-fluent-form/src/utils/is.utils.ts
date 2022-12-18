export const isNumber = (o: unknown): o is number => typeof o === 'number';
export const isString = (o: unknown): o is string => typeof o === 'string';
export const isFunction = (o: unknown): o is Function => typeof o === 'function';