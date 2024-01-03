import { TemplateRef } from '@angular/core';
import { NzButtonShape, NzButtonSize, NzButtonType } from 'ng-zorro-antd/button';
import { AbstractControlContainerSchema } from './abstract.schema';
import { Labelful, Length, MaybeSchemaReactiveFn } from './interfaces';
import { SingleSchemaKey } from './types';

/**
 * @public
 */
export interface FormGroupSchema<Key extends SingleSchemaKey = SingleSchemaKey> extends AbstractControlContainerSchema<Key>, Labelful {
  kind: 'group';
}

/**
 * @public
 */
export interface FormArraySchema<Key extends SingleSchemaKey = SingleSchemaKey> extends AbstractControlContainerSchema<Key>, Labelful {
  kind: 'array';
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
