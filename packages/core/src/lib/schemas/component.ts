import type { AbstractSchema } from './abstract.schema';
import type { SingleSchemaKey } from './types';

export type AbstractComponentSchema<Key extends SingleSchemaKey = SingleSchemaKey> = AbstractSchema<Key>;
