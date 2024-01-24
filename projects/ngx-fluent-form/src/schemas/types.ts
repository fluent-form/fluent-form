/** 任意字段控件名称 */
export type SchemaKey = SingleSchemaKey | MultiSchemaKey;
/** 单字段图示名称 */
export type SingleSchemaKey = string | number;
/** 多字段图示名称 */
export type MultiSchemaKey = readonly string[];
