import { TemplateRef } from '@angular/core';
import { NzButtonShape, NzButtonSize, NzButtonType } from 'ng-zorro-antd/button';
import { AbstractControlContainerSchema } from './abstract.schema';
import { Length, SchemaContext } from './interfaces';
import { SchemaKey } from './types';

export interface FormGroupSchema<Key extends SchemaKey = SchemaKey> extends AbstractControlContainerSchema<Key> {
  kind: 'group';
}

export interface FormArraySchema<Key extends SchemaKey = SchemaKey> extends AbstractControlContainerSchema<Key> {
  kind: 'array';
  length?: Length;
  addable?: boolean | AddableButton;
  removable?: boolean;
}

interface AddableButton {
  type?: NzButtonType;
  ghost?: boolean | ((ctx: SchemaContext<FormArraySchema<SchemaKey>>) => boolean) | string;
  danger?: boolean | ((ctx: SchemaContext<FormArraySchema<SchemaKey>>) => boolean) | string;
  shape?: NzButtonShape;
  size?: NzButtonSize;
  block?: boolean;
  icon?: string;
  content?: string | TemplateRef<void>;
}
