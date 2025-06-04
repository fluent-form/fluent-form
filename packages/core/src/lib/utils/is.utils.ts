import type { SafeAny } from '@ngify/types';

export const isObject = (o: unknown): o is object => typeof o === 'object';
export const isNumber = (o: unknown): o is number => typeof o === 'number';
export const isString = (o: unknown): o is string => typeof o === 'string';
export const isFunction = (o: unknown): o is (...args: SafeAny) => SafeAny => typeof o === 'function';
export const isBoolean = (o: unknown): o is boolean => typeof o === 'boolean';
export const isUndefined = (o: unknown): o is undefined => o === undefined;
export const isArray = (o: unknown): o is SafeAny[] => Array.isArray(o);
