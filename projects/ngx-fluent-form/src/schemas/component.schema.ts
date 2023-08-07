import { TemplateRef } from '@angular/core';
import { NzButtonShape, NzButtonSize, NzButtonType } from 'ng-zorro-antd/button';
import { NzFormTextComponent } from 'ng-zorro-antd/form';
import { AbstractSchema } from './abstract.schema';
import { ComponentEventListenerHolder, ComponentPropertyHolder, ElementEventListenerHolder, ElementPropertyHolder, Icon, Labelful, PropertyHolder, SchemaContext } from './interfaces';
import { SchemaKey } from './types';

export interface TemplateSchema<Key extends SchemaKey = SchemaKey> extends AbstractSchema<Key>, Labelful, PropertyHolder {
  kind: 'template';
}

export interface TextComponentSchema<Key extends SchemaKey = SchemaKey>
  extends AbstractSchema<Key>, Labelful, ComponentEventListenerHolder<NzFormTextComponent>, ComponentPropertyHolder<NzFormTextComponent> {
  kind: 'text';
  content: string | TemplateRef<void>;
}

export interface ButtonComponentSchema<Key extends SchemaKey = SchemaKey>
  extends AbstractSchema<Key>, Labelful, ElementEventListenerHolder, ElementPropertyHolder<HTMLButtonElement> {
  kind: 'button';
  type?: NzButtonType;
  mode?: 'submit' | 'reset' | 'menu';
  disabled?: boolean | ((ctx: SchemaContext<ButtonComponentSchema<SchemaKey>>) => boolean) | string;
  loading?: boolean | ((ctx: SchemaContext<ButtonComponentSchema<SchemaKey>>) => boolean) | string;
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

export interface HeadingComponentSchema<Key extends SchemaKey = SchemaKey>
  extends AbstractSchema<Key>, ElementEventListenerHolder, ElementPropertyHolder<HTMLHeadingElement> {
  kind: 'heading';
  level: 1 | 2 | 3 | 4 | 5 | 6;
  content: string | TemplateRef<void>;
}
