import { AbstractSchema } from './abstract.schema';
import { SingleSchemaKey } from './types';

export type AbstractComponentSchema<Key extends SingleSchemaKey = SingleSchemaKey> = AbstractSchema<Key>;
