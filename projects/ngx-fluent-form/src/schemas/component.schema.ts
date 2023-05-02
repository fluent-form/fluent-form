import { TemplateRef } from '@angular/core';
import { ThemeType } from '@ant-design/icons-angular';
import { NzButtonShape, NzButtonSize, NzButtonType } from 'ng-zorro-antd/button';
import { NzFormTextComponent } from 'ng-zorro-antd/form';
import { AbstractSchema } from './abstract.schema';
import { CallbackArgs, ComponentEventListenerHolder, ComponentPropertyHolder, ElementEventListenerHolder, ElementPropertyHolder, Labelful } from './interfaces';
import { SchemaName } from './types';

/** @internal */
interface Icon {
  type: string;
  theme?: ThemeType;
  spin?: boolean;
  rotate?: number;
}

export interface TextComponentSchema<Name extends SchemaName = SchemaName>
  extends AbstractSchema<Name>, Labelful, ComponentEventListenerHolder<NzFormTextComponent>, ComponentPropertyHolder<NzFormTextComponent> {
  kind: 'text';
  content: string | TemplateRef<void>;
}

export interface ButtonComponentSchema<Name extends SchemaName = SchemaName>
  extends AbstractSchema<Name>, Labelful, ElementEventListenerHolder, ElementPropertyHolder<HTMLButtonElement> {
  kind: 'button';
  type?: NzButtonType;
  mode?: 'submit' | 'reset' | 'menu';
  disabled?: boolean | ((args: CallbackArgs<ButtonComponentSchema<SchemaName>>) => boolean) | string;
  ghost?: boolean | ((args: CallbackArgs<ButtonComponentSchema<SchemaName>>) => boolean) | string;
  danger?: boolean | ((args: CallbackArgs<ButtonComponentSchema<SchemaName>>) => boolean) | string;
  loading?: boolean | ((args: CallbackArgs<ButtonComponentSchema<SchemaName>>) => boolean) | string;
  shape?: NzButtonShape;
  size?: NzButtonSize;
  block?: boolean;
  icon?: string | Icon;
  content?: string | TemplateRef<void>;
}
