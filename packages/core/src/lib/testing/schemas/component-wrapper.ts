import type {
  AbstractComponentWrapperSchema,
  ElementEventListenerHolder,
  ElementEventObserverHolder,
  ElementPropertyHolder,
  SingleSchemaKey
} from '../../schemas';
import type { ButtonComponentSchema } from './component';

/**
 * @public
 */
export interface ButtonGroupComponentSchema<Key extends SingleSchemaKey = SingleSchemaKey>
  extends AbstractComponentWrapperSchema<Key>, ElementEventListenerHolder, ElementEventObserverHolder, ElementPropertyHolder<HTMLElement> {
  kind: 'button-group';
  label?: string;
  schemas: ButtonComponentSchema[];
}
