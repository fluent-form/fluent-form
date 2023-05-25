import { SafeAny } from '@ngify/types';
import { SchemaKey } from '../schemas/types';
import { isString } from '../utils';

export const REST_SCHEMA = ['schemas'] as const;

export type RestSchema = typeof REST_SCHEMA[number];
export type KindOrKey = 'kind' | 'key';
export type KindOrSchemas = 'kind' | 'schemas';

export function isSchemaKeyTuple(arr: SafeAny[]): arr is [SchemaKey] {
  return isString(arr[0]);
}

export function isEmptyArray(arr: SafeAny[]): arr is [] {
  return arr.length === 0;
}
