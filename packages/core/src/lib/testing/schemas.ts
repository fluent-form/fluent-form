import { SafeAny } from '@ngify/types';
import { AbstractControlSchema, AbstractFormGroupSchema, AbstractHeadlessControlSchema, AbstractSchema, ElementControlEventListenerHolder, ElementEventListenerHolder, ElementPropertyHolder, MaybeSchemaReactiveFn, PropertyHolder, SingleSchemaKey } from '../schemas';

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

/**
 * @public
 */
export interface HeadlessControlSchema<Key extends SingleSchemaKey = SingleSchemaKey> extends AbstractControlSchema<Key, SafeAny>, AbstractHeadlessControlSchema {
  kind: 'headless';
}

/**
 * @public
 */
export interface InputControlSchema<Key extends SingleSchemaKey = SingleSchemaKey, Val = string>
  extends AbstractControlSchema<Key, Val>, ElementControlEventListenerHolder<Val>, ElementPropertyHolder<HTMLInputElement> {
  kind: 'input';
  type?: 'text' | 'number' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'color';
  placeholder?: string;
}

/**
 * @public
 */
export type FormGroupSchema<Key extends SingleSchemaKey = SingleSchemaKey> = AbstractFormGroupSchema<Key>
