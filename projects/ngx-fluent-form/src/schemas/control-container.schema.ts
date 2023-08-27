import { TemplateRef } from '@angular/core';
import { NzButtonShape, NzButtonSize, NzButtonType } from 'ng-zorro-antd/button';
import { AbstractControlContainerSchema } from './abstract.schema';
import { Labelful, Length } from './interfaces';
import { SchemaKey } from './types';

export interface FormGroupSchema<Key extends SchemaKey = SchemaKey> extends AbstractControlContainerSchema<Key> {
  kind: 'group';
  /* Used to define the label of the control. */
  label?: string;
}

export interface FormArraySchema<Key extends SchemaKey = SchemaKey> extends AbstractControlContainerSchema<Key>, Labelful {
  kind: 'array';
  length?: Length;
  addable?: boolean | AddableButton;
  removable?: boolean;
  orderable?: boolean;
}

interface AddableButton {
  type?: NzButtonType;
  icon?: string;
  content?: string | TemplateRef<void>;
  size?: NzButtonSize;
  variants?: {
    block?: boolean;
    shape?: NzButtonShape;
    danger?: boolean;
    ghost?: boolean;
  }
}
