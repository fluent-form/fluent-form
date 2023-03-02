import { SafeAny } from '@ngify/types';
import { SchemaName } from '../schemas/types';
import { isString } from '../utils';

export const REST_SCHEMA = ['schemas'] as const;

export type RestSchema = typeof REST_SCHEMA[number];
export type KindAndName = 'kind' | 'name';
export type KindOrSchemas = 'kind' | 'schemas';

export function isSchemaNameTuple(arr: SafeAny[]): arr is [SchemaName] {
  return isString(arr[0]);
}

export function isEmptyArray(arr: SafeAny[]): arr is [] {
  return arr.length === 0;
}
