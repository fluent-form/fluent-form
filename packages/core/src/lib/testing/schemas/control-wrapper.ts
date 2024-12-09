import { AbstractControlWrapperSchema, ElementEventListenerHolder, ElementEventObserverHolder, ElementPropertyHolder, SingleSchemaKey } from '../../schemas';

export interface InputGroupComponentSchema<Key extends SingleSchemaKey = SingleSchemaKey>
  extends AbstractControlWrapperSchema<Key>, ElementEventListenerHolder, ElementEventObserverHolder, ElementPropertyHolder<HTMLElement> {
  kind: 'input-group';
}
