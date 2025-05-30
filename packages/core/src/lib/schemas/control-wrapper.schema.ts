import type { Indexable } from '../types';
import type { AbstractBranchSchema } from './abstract.schema';
import type { AbstractControlSchema } from './control.schema';
import type { SingleSchemaKey } from './types';

/**
 * @public
 */
export interface AbstractControlWrapperSchema<Key extends SingleSchemaKey = SingleSchemaKey> extends AbstractBranchSchema<Key> {
  schemas: Indexable<AbstractControlSchema>[];
}
