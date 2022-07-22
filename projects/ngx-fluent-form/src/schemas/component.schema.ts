import { TemplateRef } from '@angular/core';
import { ThemeType } from '@ant-design/icons-angular';
import { NzButtonComponent, NzButtonShape, NzButtonSize, NzButtonType } from 'ng-zorro-antd/button';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzInputGroupComponent } from 'ng-zorro-antd/input';
import { Builder } from '../utils/builder.utils';
import { AbstractComponentSchema, AbstractElementSchema, AbstractSchema, SingleKeySchemaName } from './abstract.schema';
import { ComposableComponentBuilder, ComposableComponentSchema } from './index.schema';

/** @internal */
interface Icon {
  type: string;
  theme?: ThemeType;
  spin?: boolean;
  rotate?: number;
}

export interface InputGroupComponentSchema<Name extends SingleKeySchemaName = SingleKeySchemaName> extends AbstractSchema<Name>, AbstractComponentSchema<NzInputGroupComponent> {
  type: 'input-group';
  schemas: (ComposableComponentSchema | ComposableComponentBuilder)[];
  required?: boolean;
  before?: string | TemplateRef<void> | { icon: string };
  after?: string | TemplateRef<void> | { icon: string };
  prefix?: string | TemplateRef<void> | { icon: string };
  suffix?: string | TemplateRef<void> | { icon: string };
  size?: NzSizeLDSType;
}

export interface ButtonComponentSchema<Name extends SingleKeySchemaName = SingleKeySchemaName> extends AbstractSchema<Name>, AbstractElementSchema<HTMLButtonElement> {
  type: 'button';
  subtype?: NzButtonType;
  disabled?: boolean;
  ghost?: boolean;
  danger?: boolean;
  loading?: boolean;
  shape?: NzButtonShape;
  size?: NzButtonSize;
  block?: boolean;
  icon?: string | Icon;
  content?: string | TemplateRef<void>;
}

export interface ButtonGroupComponentSchema<Name extends SingleKeySchemaName = SingleKeySchemaName> extends AbstractSchema<Name>, AbstractComponentSchema<NzButtonComponent> {
  type: 'button-group';
  schemas: (ButtonComponentSchema | Builder<ButtonComponentSchema, ButtonComponentSchema, {}>)[];
  size?: NzButtonSize;
}
