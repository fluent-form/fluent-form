import { Indexable } from '../types';
import { AbstractBranchSchema } from './abstract.schema';
import { AbstractControlSchema } from './control.schema';
import { SingleSchemaKey } from './types';

/**
 * @public
 */
export interface AbstractControlWrapperSchema<Key extends SingleSchemaKey = SingleSchemaKey> extends AbstractBranchSchema<Key> {
  schemas: Indexable<AbstractControlSchema>[];
}
