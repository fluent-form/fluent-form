import { AbstractControlWrapperSchema, ElementEventListenerHolder, ElementPropertyHolder, SingleSchemaKey } from '../../schemas';

export interface InputGroupComponentSchema<Key extends SingleSchemaKey = SingleSchemaKey>
  extends AbstractControlWrapperSchema<Key>, ElementEventListenerHolder, ElementPropertyHolder<HTMLElement> {
  kind: 'input-group';
}
