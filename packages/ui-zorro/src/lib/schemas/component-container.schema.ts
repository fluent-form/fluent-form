import { TemplateRef } from '@angular/core';
import {
  AbstractComponentContainerSchema,
  ComponentEventListenerHolder,
  ComponentEventObserverHolder,
  ComponentPropertyHolder,
  MaybeSchemaReactiveFn,
  SingleSchemaKey
} from '@fluent-form/core';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzSizeDSType, NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzStatusType, NzStepComponent, NzStepsComponent } from 'ng-zorro-antd/steps';
import type { NzTabComponent, NzTabPosition, NzTabsComponent, NzTabType } from 'ng-zorro-antd/tabs';
import { Labelful } from './interfaces';

/**
 * @public
 */
export interface StepsComponentSchema<Key extends SingleSchemaKey = SingleSchemaKey>
  extends AbstractComponentContainerSchema<Key>,
  ComponentEventListenerHolder<NzStepsComponent>,
  ComponentEventObserverHolder<NzStepsComponent>,
  ComponentPropertyHolder<NzStepsComponent>,
  Labelful {
  kind: 'steps';
  type?: 'default' | 'navigation';
  active?: number;
  dot?: boolean;
  size?: NzSizeDSType;
  status?: NzStatusType;
  start?: number;
  schemas: StepComponentSchema[];
}

/**
 * @public
 */
export interface StepComponentSchema<Key extends SingleSchemaKey = SingleSchemaKey>
  extends AbstractComponentContainerSchema<Key>,
  ComponentEventListenerHolder<NzStepComponent>,
  ComponentEventObserverHolder<NzStepComponent>,
  ComponentPropertyHolder<NzStepComponent> {
  kind: 'step';
  title: string | TemplateRef<void>;
  subtitle?: string | TemplateRef<void>;
  description?: string | TemplateRef<void>;
  disabled?: MaybeSchemaReactiveFn<StepComponentSchema<SingleSchemaKey>, boolean>;
  status?: 'wait' | 'process' | 'finish' | 'error';
}

/**
 * @public
 */
export interface TabsComponentSchema<Key extends SingleSchemaKey = SingleSchemaKey>
  extends AbstractComponentContainerSchema<Key>,
  ComponentEventListenerHolder<NzTabsComponent>,
  ComponentEventObserverHolder<NzTabsComponent>,
  ComponentPropertyHolder<NzTabsComponent>,
  Labelful {
  kind: 'tabs';
  type?: NzTabType;
  active?: number;
  size?: NzSizeLDSType;
  position?: NzTabPosition;
  gutter?: number;
  centered?: boolean;
  schemas: TabComponentSchema[];
}

/**
 * @public
 */
export interface TabComponentSchema<Key extends SingleSchemaKey = SingleSchemaKey>
  extends AbstractComponentContainerSchema<Key>,
  ComponentEventListenerHolder<NzTabComponent>,
  ComponentEventObserverHolder<NzTabComponent>,
  ComponentPropertyHolder<NzTabComponent> {
  kind: 'tab';
  title: string;
  disabled?: MaybeSchemaReactiveFn<TabComponentSchema<SingleSchemaKey>, boolean>;
}

export interface CardComponentSchema<Key extends SingleSchemaKey = SingleSchemaKey>
  extends AbstractComponentContainerSchema<Key>,
  ComponentEventListenerHolder<NzCardComponent>,
  ComponentEventObserverHolder<NzCardComponent>,
  ComponentPropertyHolder<NzTabComponent> {
  kind: 'card';
  borderless?: boolean;
  hoverable?: boolean;
  size?: NzCardComponent['nzSize'];
}
