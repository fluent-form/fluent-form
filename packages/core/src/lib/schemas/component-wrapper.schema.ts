import type { AbstractBranchSchema } from './abstract.schema';
import type { SingleSchemaKey } from './types';

/**
 * @public
 */
export type AbstractComponentWrapperSchema<Key extends SingleSchemaKey = SingleSchemaKey> = AbstractBranchSchema<Key>;
