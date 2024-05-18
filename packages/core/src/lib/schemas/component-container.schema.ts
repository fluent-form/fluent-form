import { AbstractBranchSchema } from './abstract.schema';
import { ElementEventListenerHolder, ElementPropertyHolder, Row } from './interfaces';
import { SingleSchemaKey } from './types';

/**
 * @public
 */
export type AbstractComponentContainerSchema<Key extends SingleSchemaKey = SingleSchemaKey> = AbstractBranchSchema<Key>

/**
 * @public
 */
export interface RowComponentSchema<Key extends SingleSchemaKey = SingleSchemaKey>
  extends AbstractComponentContainerSchema<Key>, ElementEventListenerHolder, ElementPropertyHolder<HTMLElement>, Row {
  kind: 'row';
}
