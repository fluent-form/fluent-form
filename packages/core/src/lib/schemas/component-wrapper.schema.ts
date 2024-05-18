import { AbstractBranchSchema } from './abstract.schema';
import { SingleSchemaKey } from './types';

/**
 * @public
 */
export type AbstractComponentWrapperSchema<Key extends SingleSchemaKey = SingleSchemaKey> = AbstractBranchSchema<Key>
