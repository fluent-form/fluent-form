import { TemplateRef } from '@angular/core';
import { NzSizeDSType, NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzStatusType, NzStepComponent, NzStepsComponent } from 'ng-zorro-antd/steps';
import { NzTabComponent, NzTabPosition, NzTabSetComponent, NzTabType } from 'ng-zorro-antd/tabs';
import { AbstractSchema } from './abstract.schema';
import { AnySchema } from './index.schema';
import { ComponentEventListenerHolder, ComponentPropertyHolder, ElementEventListenerHolder, ElementPropertyHolder, MaybeSchemaReactiveFn, Row } from './interfaces';
import { SingleSchemaKey } from './types';

/**
 * @public
 */
export interface StepsComponentSchema<Key extends SingleSchemaKey = SingleSchemaKey>
  extends AbstractSchema<Key>, ComponentEventListenerHolder<NzStepsComponent>, ComponentPropertyHolder<NzStepsComponent> {
  kind: 'steps';
  type?: 'default' | 'navigation';
  active?: number;
  placement?: 'vertical' | 'horizontal';
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
  extends AbstractSchema<Key>, ComponentEventListenerHolder<NzStepComponent>, ComponentPropertyHolder<NzStepComponent> {
  kind: 'step';
  title: string | TemplateRef<void>;
  subtitle?: string | TemplateRef<void>;
  description?: string | TemplateRef<void>;
  disabled?: MaybeSchemaReactiveFn<StepComponentSchema<SingleSchemaKey>, boolean>;
  status?: 'wait' | 'process' | 'finish' | 'error';
  schemas: AnySchema[];
}

/**
 * @public
 */
export interface TabsComponentSchema<Key extends SingleSchemaKey = SingleSchemaKey>
  extends AbstractSchema<Key>, ComponentEventListenerHolder<NzTabSetComponent>, ComponentPropertyHolder<NzTabSetComponent> {
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
  extends AbstractSchema<Key>, ComponentEventListenerHolder<NzTabComponent>, ComponentPropertyHolder<NzTabComponent> {
  kind: 'tab';
  title: string;
  disabled?: MaybeSchemaReactiveFn<TabComponentSchema<SingleSchemaKey>, boolean>;
  schemas: AnySchema[];
}

/**
 * @public
 */
export interface RowComponentSchema<Key extends SingleSchemaKey = SingleSchemaKey>
  extends AbstractSchema<Key>, ElementEventListenerHolder, ElementPropertyHolder<HTMLElement>, Row {
  kind: 'row';
  schemas: AnySchema[];
}
