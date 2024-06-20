import { AbstractSchema, ElementEventListenerHolder, ElementPropertyHolder, MaybeSchemaReactiveFn, PropertyHolder, SingleSchemaKey } from '../../schemas';

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
  extends AbstractSchema<Key>, ElementEventListenerHolder, ElementPropertyHolder<HTMLButtonElement> {
  kind: 'button';
  mode?: HTMLButtonElement['type'];
  disabled?: MaybeSchemaReactiveFn<ButtonComponentSchema<SingleSchemaKey>, boolean>;
  content?: string;
}
