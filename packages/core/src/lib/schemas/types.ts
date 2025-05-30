/** Name of any kind of field control */
export type SchemaKey = SingleSchemaKey | MultiSchemaKey;

/** Name of a single-field schema */
export type SingleSchemaKey = string | number;

/** Name of a multi-field schema */
export type MultiSchemaKey = readonly string[];
