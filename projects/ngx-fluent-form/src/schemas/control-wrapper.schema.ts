import { TemplateRef } from '@angular/core';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzInputNumberGroupComponent } from 'ng-zorro-antd/input-number';
import { AbstractSchema } from './abstract.schema';
import { ComposableComponentSchema } from './index.schema';
import { ComponentEventListenerHolder, ComponentPropertyHolder, Labelful } from './interfaces';
import { AnySchemaKey, SchemaKey } from './types';

/**
 * @public
 */
export interface ControlWrapper<Key extends SchemaKey> extends AbstractSchema<Key> {
  schemas: ComposableComponentSchema[];
}

/**
 * @public
 */
export interface InputGroupComponentSchema<Key extends SchemaKey = SchemaKey>
  extends ControlWrapper<Key>, Labelful, ComponentEventListenerHolder<NzInputGroupComponent>, ComponentPropertyHolder<NzInputGroupComponent> {
  kind: 'input-group';
  before?: string | TemplateRef<void> | { icon: string };
  after?: string | TemplateRef<void> | { icon: string };
  prefix?: string | TemplateRef<void> | { icon: string };
  suffix?: string | TemplateRef<void> | { icon: string };
  size?: NzSizeLDSType;
  primary?: AnySchemaKey;
  compact?: boolean;
}

/**
 * @public
 */
export interface NumberGroupComponentSchema<Key extends SchemaKey = SchemaKey>
  extends ControlWrapper<Key>, Labelful, ComponentEventListenerHolder<NzInputNumberGroupComponent>, ComponentPropertyHolder<NzInputNumberGroupComponent> {
  kind: 'number-group';
  before?: string | TemplateRef<void> | { icon: string };
  after?: string | TemplateRef<void> | { icon: string };
  prefix?: string | TemplateRef<void> | { icon: string };
  suffix?: string | TemplateRef<void> | { icon: string };
  size?: NzSizeLDSType;
  primary?: AnySchemaKey;
  compact?: boolean;
}
