import { TemplateRef } from '@angular/core';
import { ThemeType } from '@ant-design/icons-angular';
import { SafeAny } from '@ngify/types';
import { NzButtonComponent, NzButtonShape, NzButtonSize, NzButtonType } from 'ng-zorro-antd/button';
import { NzSizeDSType, NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzStatusType, NzStepComponent, NzStepsComponent } from 'ng-zorro-antd/steps';
import { NzTabComponent, NzTabPositionMode, NzTabSetComponent, NzTabType } from 'ng-zorro-antd/tabs';
import { Builder } from '../utils/builder.utils';
import { AbstractComponentSchema, AbstractElementSchema, AbstractSchema, SingleKeySchemaName } from './abstract.schema';
import { AnyBuilder, AnySchema, ComposableComponentBuilder, ComposableComponentSchema } from './index.schema';

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
  before?: string | TemplateRef<void> | { icon: string };
  after?: string | TemplateRef<void> | { icon: string };
  prefix?: string | TemplateRef<void> | { icon: string };
  suffix?: string | TemplateRef<void> | { icon: string };
  size?: NzSizeLDSType;
}

export interface ButtonComponentSchema<Name extends SingleKeySchemaName = SingleKeySchemaName> extends AbstractSchema<Name>, AbstractElementSchema<HTMLButtonElement> {
  type: 'button';
  subtype?: 'submit' | 'reset' | 'menu';
  style?: NzButtonType;
  disabled?: boolean | ((model: SafeAny) => boolean) | string;
  ghost?: boolean | ((model: SafeAny) => boolean) | string;
  danger?: boolean | ((model: SafeAny) => boolean) | string;
  loading?: boolean | ((model: SafeAny) => boolean) | string;
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

export interface StepsComponentSchema<Name extends SingleKeySchemaName = SingleKeySchemaName> extends AbstractSchema<Name>, AbstractComponentSchema<NzStepsComponent> {
  type: 'steps';
  subtype?: 'default' | 'navigation';
  active?: number;
  placement?: 'vertical' | 'horizontal';
  dot?: boolean;
  size?: NzSizeDSType;
  status?: NzStatusType;
  start?: number;
  schemas: (StepComponentSchema | Builder<StepComponentSchema, StepComponentSchema, {}>)[];
}

export interface StepComponentSchema<Name extends SingleKeySchemaName = SingleKeySchemaName> extends AbstractSchema<Name>, AbstractComponentSchema<NzStepComponent> {
  type: 'step';
  title: string | TemplateRef<void>;
  subtitle?: string | TemplateRef<void>;
  description?: string | TemplateRef<void>;
  disabled?: boolean | ((model: SafeAny) => boolean) | string;
  status?: 'wait' | 'process' | 'finish' | 'error';
  schemas: (AnySchema | AnyBuilder)[];
}

export interface TabsetComponentSchema<Name extends SingleKeySchemaName = SingleKeySchemaName> extends AbstractSchema<Name>, AbstractComponentSchema<NzTabSetComponent> {
  type: 'tabset';
  subtype?: NzTabType;
  active?: number;
  animate?: boolean;
  size?: NzSizeLDSType;
  position?: NzTabPositionMode;
  gutter?: number;
  center?: boolean;
  schemas: (TabComponentSchema | Builder<TabComponentSchema, TabComponentSchema, {}>)[];
}

export interface TabComponentSchema<Name extends SingleKeySchemaName = SingleKeySchemaName> extends AbstractSchema<Name>, AbstractComponentSchema<NzTabComponent> {
  type: 'tab';
  title: string;
  disabled?: boolean | ((model: SafeAny) => boolean) | string;
  schemas: (AnySchema | AnyBuilder)[];
}