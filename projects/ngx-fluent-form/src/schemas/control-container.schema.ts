import { TemplateRef } from '@angular/core';
import { AbstractControlOptions, AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import { NzButtonShape, NzButtonSize, NzButtonType } from 'ng-zorro-antd/button';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzFormLayoutType } from 'ng-zorro-antd/form';
import { NzTabPosition } from 'ng-zorro-antd/tabs';
import { AbstractBranchSchema } from './abstract.schema';
import { ControlEventListenerHolder, Labelful, Length, MaybeSchemaReactiveFn, Row } from './interfaces';
import { SingleSchemaKey } from './types';

/**
 * @public
 * 抽象的容器控件图示
 */
export interface AbstractControlContainerSchema<Key extends SingleSchemaKey = SingleSchemaKey> extends AbstractBranchSchema<Key>, ControlEventListenerHolder<SafeAny>, Row {
  /** Validator for the control */
  validators?: ValidatorFn[];
  /** Async validators for control */
  asyncValidators?: AsyncValidatorFn[];
  /** The event name for control to update upon. */
  updateOn?: AbstractControlOptions['updateOn'];
}

/**
 * @public
 */
export interface FormGroupSchema<Key extends SingleSchemaKey = SingleSchemaKey> extends AbstractControlContainerSchema<Key>, Labelful {
  kind: 'group';
  layout?: NzFormLayoutType;
}

/**
 * @public
 */
export interface FormArraySchema<Key extends SingleSchemaKey = SingleSchemaKey> extends AbstractControlContainerSchema<Key>, Labelful {
  kind: 'array';
  layout?: NzFormLayoutType;
  length?: Length;
  addable?: MaybeSchemaReactiveFn<FormArraySchema, boolean | AddableButton>;
  removable?: boolean;
  orderable?: boolean;
}

/**
 * @internal
 */
export interface AddableButton {
  type?: NzButtonType;
  icon?: string;
  content?: string | TemplateRef<void>;
  size?: NzButtonSize;
  disabled?: boolean;
  variants?: {
    shape?: NzButtonShape;
    danger?: boolean;
    ghost?: boolean;
  }
}

/**
 * @public
 */
export interface TabsArraySchema<Key extends SingleSchemaKey = SingleSchemaKey> extends AbstractControlContainerSchema<Key>, Labelful {
  kind: 'tabs-array';
  layout?: NzFormLayoutType;
  size?: NzSizeLDSType;
  position?: NzTabPosition;
  gutter?: number;
  centered?: boolean;
  length?: Length;
  addable?: MaybeSchemaReactiveFn<TabsArraySchema, boolean>;
  removable?: boolean;
  // orderable?: boolean;
}
