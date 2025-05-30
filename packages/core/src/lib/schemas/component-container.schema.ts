import type { AbstractBranchSchema } from './abstract.schema';
import type { Row } from './grid';
import type { ElementEventListenerHolder } from './listeners';
import type { ElementEventObserverHolder } from './observers';
import type { ElementPropertyHolder } from './properties';
import type { SingleSchemaKey } from './types';

/**
 * @public
 */
export type AbstractComponentContainerSchema<Key extends SingleSchemaKey = SingleSchemaKey> = AbstractBranchSchema<Key>

/**
 * @public
 */
export interface RowComponentSchema<Key extends SingleSchemaKey = SingleSchemaKey>
  extends AbstractComponentContainerSchema<Key>, ElementEventListenerHolder, ElementEventObserverHolder, ElementPropertyHolder<HTMLElement>, Row {
  kind: 'row';
}
