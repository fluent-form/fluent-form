import { TemplateRef } from '@angular/core';
import { NzSizeDSType, NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzStatusType, NzStepComponent, NzStepsComponent } from 'ng-zorro-antd/steps';
import { NzTabComponent, NzTabPosition, NzTabSetComponent, NzTabType } from 'ng-zorro-antd/tabs';
import { StableBuilder } from '../utils';
import { AbstractSchema } from './abstract.schema';
import { AnyBuilder, AnySchema } from './index.schema';
import { ComponentEventListenerHolder, ComponentPropertyHolder, ElementEventListenerHolder, ElementPropertyHolder, Row, SchemaContext } from './interfaces';
import { SchemaKey } from './types';

export interface StepsComponentSchema<Key extends SchemaKey = SchemaKey>
  extends AbstractSchema<Key>, ComponentEventListenerHolder<NzStepsComponent>, ComponentPropertyHolder<NzStepsComponent> {
  kind: 'steps';
  type?: 'default' | 'navigation';
  active?: number;
  placement?: 'vertical' | 'horizontal';
  dot?: boolean;
  size?: NzSizeDSType;
  status?: NzStatusType;
  start?: number;
  schemas: StepComponentSchema[] | StableBuilder<StepComponentSchema>[];
}

export interface StepComponentSchema<Key extends SchemaKey = SchemaKey>
  extends AbstractSchema<Key>, ComponentEventListenerHolder<NzStepComponent>, ComponentPropertyHolder<NzStepComponent> {
  kind: 'step';
  title: string | TemplateRef<void>;
  subtitle?: string | TemplateRef<void>;
  description?: string | TemplateRef<void>;
  disabled?: boolean | ((ctx: SchemaContext<StepComponentSchema<SchemaKey>>) => boolean) | string;
  status?: 'wait' | 'process' | 'finish' | 'error';
  schemas: (AnySchema | AnyBuilder)[];
}

export interface TabsComponentSchema<Key extends SchemaKey = SchemaKey>
  extends AbstractSchema<Key>, ComponentEventListenerHolder<NzTabSetComponent>, ComponentPropertyHolder<NzTabSetComponent> {
  kind: 'tabs';
  type?: NzTabType;
  active?: number;
  animate?: boolean;
  size?: NzSizeLDSType;
  position?: NzTabPosition;
  gutter?: number;
  center?: boolean;
  schemas: (TabComponentSchema | StableBuilder<TabComponentSchema>)[];
}

export interface TabComponentSchema<Key extends SchemaKey = SchemaKey>
  extends AbstractSchema<Key>, ComponentEventListenerHolder<NzTabComponent>, ComponentPropertyHolder<NzTabComponent> {
  kind: 'tab';
  title: string;
  disabled?: boolean | ((ctx: SchemaContext<TabComponentSchema<SchemaKey>>) => boolean) | string;
  schemas: (AnySchema | AnyBuilder)[];
}

export interface RowComponentSchema<Key extends SchemaKey = SchemaKey>
  extends AbstractSchema<Key>, ElementEventListenerHolder, ElementPropertyHolder<HTMLElement>, Row {
  kind: 'row';
  schemas: (AnySchema | AnyBuilder)[];
}
