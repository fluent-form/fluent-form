import { TemplateRef } from '@angular/core';
import {
  AbstractComponentSchema,
  ComponentEventListenerHolder,
  ComponentPropertyHolder,
  ElementEventListenerHolder,
  ElementEventObserverHolder,
  ElementPropertyHolder,
  MaybeSchemaReactiveFn,
  PropertyHolder,
  SingleSchemaKey
} from '@fluent-form/core';
import { NzAlertComponent } from 'ng-zorro-antd/alert';
import { NzButtonShape, NzButtonSize, NzButtonType } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
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
export interface ButtonComponentSchema<Key extends SingleSchemaKey = SingleSchemaKey>
  extends AbstractComponentSchema<Key>, Labelful, ElementEventListenerHolder, ElementEventObserverHolder, ElementPropertyHolder<HTMLButtonElement> {
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
  };
}

/**
 * @public
 */
export interface HeadingComponentSchema<Key extends SingleSchemaKey = SingleSchemaKey>
  extends AbstractComponentSchema<Key>, ElementEventListenerHolder, ElementEventObserverHolder, ElementPropertyHolder<HTMLHeadingElement> {
  kind: 'heading';
  level: 1 | 2 | 3 | 4 | 5 | 6;
  content: string | TemplateRef<void>;
}

/**
 * @public
 */
export interface AlertComponentSchema<Key extends SingleSchemaKey = SingleSchemaKey>
  extends AbstractComponentSchema<Key>,
  Labelful,
  ComponentEventListenerHolder<NzAlertComponent>,
  ElementEventObserverHolder,
  ComponentPropertyHolder<NzAlertComponent> {
  kind: 'alert';
  type?: NzAlertComponent['nzType'];
  icon?: boolean | string;
  action?: string | TemplateRef<void>;
  closeable?: boolean;
  message: string | TemplateRef<void>;
  description?: string | TemplateRef<void>;
  variants?: {
    banner?: boolean;
  };
}

export interface IconComponentSchema<Key extends SingleSchemaKey = SingleSchemaKey>
  extends AbstractComponentSchema<Key>, ComponentPropertyHolder<NzIconDirective> {
  kind: 'icon';
  type: MaybeSchemaReactiveFn<IconComponentSchema<SingleSchemaKey>, string>;
  theme?: NzIconDirective['nzTheme'];
  spin?: boolean;
  rotate?: number;
}
