import { TemplateRef } from '@angular/core';
import { AbstractComponentSchema, AbstractSchema, ComponentEventListenerHolder, ComponentPropertyHolder, ElementEventListenerHolder, ElementPropertyHolder, MaybeSchemaReactiveFn, PropertyHolder, SingleSchemaKey } from '@fluent-form/core';
import { NzAlertComponent } from 'ng-zorro-antd/alert';
import { NzButtonShape, NzButtonSize, NzButtonType } from 'ng-zorro-antd/button';
import { NzFormTextComponent } from 'ng-zorro-antd/form';
import { Icon, Labelful } from './interfaces';

/**
 * @public
 */
export interface TemplateSchema<Key extends SingleSchemaKey = SingleSchemaKey> extends AbstractComponentSchema<Key>, Labelful, PropertyHolder {
  kind: 'template';
}

/**
 * @public
 */
export interface TextComponentSchema<Key extends SingleSchemaKey = SingleSchemaKey>
  extends AbstractComponentSchema<Key>, Labelful, ComponentEventListenerHolder<NzFormTextComponent>, ComponentPropertyHolder<NzFormTextComponent> {
  kind: 'text';
  content: string | TemplateRef<void>;
}

/**
 * @public
 */
export interface ButtonComponentSchema<Key extends SingleSchemaKey = SingleSchemaKey>
  extends AbstractComponentSchema<Key>, Labelful, ElementEventListenerHolder, ElementPropertyHolder<HTMLButtonElement> {
  kind: 'button';
  type?: NzButtonType;
  mode?: HTMLButtonElement['type'];
  disabled?: MaybeSchemaReactiveFn<ButtonComponentSchema<SingleSchemaKey>, boolean>;
  loading?: MaybeSchemaReactiveFn<ButtonComponentSchema<SingleSchemaKey>, boolean>;
  icon?: string | Icon;
  content?: string | TemplateRef<void>;
  size?: NzButtonSize;
  variants?: {
    block?: boolean;
    shape?: NzButtonShape;
    danger?: boolean;
    ghost?: boolean;
  }
}

/**
 * @public
 */
export interface HeadingComponentSchema<Key extends SingleSchemaKey = SingleSchemaKey>
  extends AbstractSchema<Key>, ElementEventListenerHolder, ElementPropertyHolder<HTMLHeadingElement> {
  kind: 'heading';
  level: 1 | 2 | 3 | 4 | 5 | 6;
  content: string | TemplateRef<void>;
}

/**
 * @public
 */
export interface AlertComponentSchema<Key extends SingleSchemaKey = SingleSchemaKey>
  extends AbstractSchema<Key>, ComponentEventListenerHolder<NzAlertComponent>, ComponentPropertyHolder<NzAlertComponent> {
  kind: 'alert';
  type?: NzAlertComponent['nzType'];
  icon?: boolean | string;
  action?: string | TemplateRef<void>;
  closeable?: boolean;
  message: string | TemplateRef<void>;
  description?: string | TemplateRef<void>;
  variants?: {
    banner?: boolean;
  }
}
