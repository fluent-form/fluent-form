import { TemplateRef } from '@angular/core';
import { ThemeType } from '@ant-design/icons-angular';
import { NzButtonComponent, NzButtonShape, NzButtonSize, NzButtonType } from 'ng-zorro-antd/button';
import { NzSizeDSType, NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzFormTextComponent } from 'ng-zorro-antd/form';
import { NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzStatusType, NzStepComponent, NzStepsComponent } from 'ng-zorro-antd/steps';
import { NzTabComponent, NzTabPositionMode, NzTabSetComponent, NzTabType } from 'ng-zorro-antd/tabs';
import { StableBuilder } from '../utils/builder.utils';
import { AbstractComponentSchema, AbstractElementSchema, AbstractLabelfulSchema, AbstractSchema, AnySchemaName, CallbackArg, SchemaName } from './abstract.schema';
import { AnyBuilder, AnySchema, ComposableComponentBuilder, ComposableComponentSchema } from './index.schema';

/** @internal */
interface Icon {
  type: string;
  theme?: ThemeType;
  spin?: boolean;
  rotate?: number;
}

export interface InputGroupComponentSchema<Name extends SchemaName = SchemaName> extends AbstractSchema<Name>, AbstractComponentSchema<NzInputGroupComponent>, AbstractLabelfulSchema {
  kind: 'input-group';
  schemas: (ComposableComponentSchema | ComposableComponentBuilder)[];
  before?: string | TemplateRef<void> | { icon: string };
  after?: string | TemplateRef<void> | { icon: string };
  prefix?: string | TemplateRef<void> | { icon: string };
  suffix?: string | TemplateRef<void> | { icon: string };
  size?: NzSizeLDSType;
  primary?: AnySchemaName;
}

export interface TextComponentSchema<Name extends SchemaName = SchemaName> extends AbstractSchema<Name>, AbstractComponentSchema<NzFormTextComponent>, AbstractLabelfulSchema {
  kind: 'text';
  content: string | TemplateRef<void>;
}

export interface ButtonComponentSchema<Name extends SchemaName = SchemaName> extends AbstractSchema<Name>, AbstractElementSchema<HTMLButtonElement>, AbstractLabelfulSchema {
  kind: 'button';
  type?: NzButtonType;
  mode?: 'submit' | 'reset' | 'menu';
  disabled?: boolean | ((arg: CallbackArg<ButtonComponentSchema<SchemaName>>) => boolean) | string;
  ghost?: boolean | ((arg: CallbackArg<ButtonComponentSchema<SchemaName>>) => boolean) | string;
  danger?: boolean | ((arg: CallbackArg<ButtonComponentSchema<SchemaName>>) => boolean) | string;
  loading?: boolean | ((arg: CallbackArg<ButtonComponentSchema<SchemaName>>) => boolean) | string;
  shape?: NzButtonShape;
  size?: NzButtonSize;
  block?: boolean;
  icon?: string | Icon;
  content?: string | TemplateRef<void>;
}

export interface ButtonGroupComponentSchema<Name extends SchemaName = SchemaName> extends AbstractSchema<Name>, AbstractComponentSchema<NzButtonComponent>, AbstractLabelfulSchema {
  kind: 'button-group';
  schemas: (ButtonComponentSchema | StableBuilder<ButtonComponentSchema>)[];
  size?: NzButtonSize;
}

export interface StepsComponentSchema<Name extends SchemaName = SchemaName> extends AbstractSchema<Name>, AbstractComponentSchema<NzStepsComponent> {
  kind: 'steps';
  type?: 'default' | 'navigation';
  active?: number;
  placement?: 'vertical' | 'horizontal';
  dot?: boolean;
  size?: NzSizeDSType;
  status?: NzStatusType;
  start?: number;
  schemas: (StepComponentSchema | StableBuilder<StepComponentSchema>)[];
}

export interface StepComponentSchema<Name extends SchemaName = SchemaName> extends AbstractSchema<Name>, AbstractComponentSchema<NzStepComponent> {
  kind: 'step';
  title: string | TemplateRef<void>;
  subtitle?: string | TemplateRef<void>;
  description?: string | TemplateRef<void>;
  disabled?: boolean | ((arg: CallbackArg<StepComponentSchema<SchemaName>>) => boolean) | string;
  status?: 'wait' | 'process' | 'finish' | 'error';
  schemas: (AnySchema | AnyBuilder)[];
}

export interface TabsetComponentSchema<Name extends SchemaName = SchemaName> extends AbstractSchema<Name>, AbstractComponentSchema<NzTabSetComponent> {
  kind: 'tabset';
  type?: NzTabType;
  active?: number;
  animate?: boolean;
  size?: NzSizeLDSType;
  position?: NzTabPositionMode;
  gutter?: number;
  center?: boolean;
  schemas: (TabComponentSchema | StableBuilder<TabComponentSchema>)[];
}

export interface TabComponentSchema<Name extends SchemaName = SchemaName> extends AbstractSchema<Name>, AbstractComponentSchema<NzTabComponent> {
  kind: 'tab';
  title: string;
  disabled?: boolean | ((arg: CallbackArg<TabComponentSchema<SchemaName>>) => boolean) | string;
  schemas: (AnySchema | AnyBuilder)[];
}
