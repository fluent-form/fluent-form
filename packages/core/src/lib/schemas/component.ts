import { AbstractSchema } from './abstract.schema';
import { SingleSchemaKey } from './types';

export type AbstractComponenSchema<Key extends SingleSchemaKey = SingleSchemaKey> = AbstractSchema<Key>;
