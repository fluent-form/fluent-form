import { TemplateRef } from '@angular/core';
import { NzSizeDSType, NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzStatusType, NzStepComponent, NzStepsComponent } from 'ng-zorro-antd/steps';
import { NzTabComponent, NzTabPositionMode, NzTabSetComponent, NzTabType } from 'ng-zorro-antd/tabs';
import { StableBuilder } from '../utils';
import { AbstractComponentSchema, AbstractSchema, CallbackArg, SchemaName } from './abstract.schema';
import { AnyBuilder, AnySchema } from './index.schema';

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
