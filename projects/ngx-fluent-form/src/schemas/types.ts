import { SafeAny } from '@ngify/types';
import { StableBuilder } from '../utils';
import { SchemaLike } from './interfaces';

export type Cell = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24;

/** 任意字段控件名称 */
export type AnySchemaName = SchemaName | DoubleSchemaName;
/** 单字段图示名称 */
export type SchemaName = string | number;
/** 双字段图示名称 */
export type DoubleSchemaName = readonly [string, string];

/** 排除图示构建器 */
type ExcludeSchemaBuilder<T> =
  T extends (SchemaLike | StableBuilder<SchemaLike>)[]
  ? ExcludeSchemaBuilder<T[number]>[]
  : T extends SchemaLike
  ? StandardSchema<T>
  : Exclude<T, StableBuilder<SafeAny>>

/** 标准化的图示 */
export type StandardSchema<S extends SchemaLike> = {
  [K in keyof S]: ExcludeSchemaBuilder<S[K]>
}
