import { AbstractSchema, ElementEventListenerHolder, ElementEventObserverHolder, ElementPropertyHolder, MaybeSchemaReactiveFn, PropertyHolder, SingleSchemaKey } from '../../schemas';

/**
 * @public
 */
export interface TemplateSchema<Key extends SingleSchemaKey = SingleSchemaKey> extends AbstractSchema<Key>, PropertyHolder {
  kind: 'template';
}

/**
 * @public
 */
export interface ButtonComponentSchema<Key extends SingleSchemaKey = SingleSchemaKey>
  extends AbstractSchema<Key>, ElementEventListenerHolder, ElementEventObserverHolder, ElementPropertyHolder<HTMLButtonElement> {
  kind: 'button';
  mode?: HTMLButtonElement['type'];
  disabled?: MaybeSchemaReactiveFn<ButtonComponentSchema<SingleSchemaKey>, boolean>;
  content?: string;
}
