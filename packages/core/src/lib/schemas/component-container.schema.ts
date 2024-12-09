import { AbstractBranchSchema } from './abstract.schema';
import { Row } from './grid';
import { ElementEventListenerHolder } from './listeners';
import { ElementPropertyHolder } from './properties';
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
