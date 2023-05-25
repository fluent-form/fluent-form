import { TemplateRef } from '@angular/core';
import { ThemeType } from '@ant-design/icons-angular';
import { NzButtonShape, NzButtonSize, NzButtonType } from 'ng-zorro-antd/button';
import { NzFormTextComponent } from 'ng-zorro-antd/form';
import { AbstractSchema } from './abstract.schema';
import { ComponentEventListenerHolder, ComponentPropertyHolder, ElementEventListenerHolder, ElementPropertyHolder, Labelful, PropertyHolder, SchemaContext } from './interfaces';
import { SchemaKey } from './types';

/** @internal */
interface Icon {
  type: string;
  theme?: ThemeType;
  spin?: boolean;
  rotate?: number;
}

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
  ghost?: boolean | ((ctx: SchemaContext<ButtonComponentSchema<SchemaKey>>) => boolean) | string;
  danger?: boolean | ((ctx: SchemaContext<ButtonComponentSchema<SchemaKey>>) => boolean) | string;
  loading?: boolean | ((ctx: SchemaContext<ButtonComponentSchema<SchemaKey>>) => boolean) | string;
  shape?: NzButtonShape;
  size?: NzButtonSize;
  block?: boolean;
  icon?: string | Icon;
  content?: string | TemplateRef<void>;
}
