import { TemplateRef } from '@angular/core';
import { ThemeType } from '@ant-design/icons-angular';
import { NzButtonComponent, NzButtonShape, NzButtonSize, NzButtonType } from 'ng-zorro-antd/button';
import { NzInputGroupComponent } from 'ng-zorro-antd/input';
import { Builder } from '../utils/builder.utils';
import { AbstractComponentSchema, AbstractElementSchema, AbstractSchema, SingleKeySchemaName } from './abstract.schema';
import { ComposableComponentBuilder, ComposableComponentSchema } from './index.schema';

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
  /** The pre-label of the input box */
  before?: {
    icon?: string,
    template?: string | TemplateRef<void>
  };
  /** The back label of the input box */
  after?: {
    icon?: string,
    template?: string | TemplateRef<void>
  };
  /** The prefix of the input box */
  prefix?: string | TemplateRef<void>;
  /** The suffix of the input box */
  suffix?: string | TemplateRef<void>;
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
