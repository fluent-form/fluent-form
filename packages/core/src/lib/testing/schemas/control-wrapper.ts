import type {
  AbstractControlWrapperSchema,
  ElementEventListenerHolder,
  ElementEventObserverHolder,
  ElementPropertyHolder,
  SingleSchemaKey
} from '../../schemas';

export interface FieldGroupComponentSchema<Key extends SingleSchemaKey = SingleSchemaKey>
  extends AbstractControlWrapperSchema<Key>, ElementEventListenerHolder, ElementEventObserverHolder, ElementPropertyHolder<HTMLElement> {
  kind: 'field-group';
}
