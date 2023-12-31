import { TemplateRef } from '@angular/core';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzInputNumberGroupComponent } from 'ng-zorro-antd/input-number';
import { AbstractSchema } from './abstract.schema';
import { ComposableComponentSchema } from './index.schema';
import { ComponentEventListenerHolder, ComponentPropertyHolder, Labelful, SchemaReactiveFn } from './interfaces';
import { SchemaKey, SingleSchemaKey } from './types';

/**
 * @public
 */
export interface ControlWrapper<Key extends SingleSchemaKey> extends AbstractSchema<Key> {
  schemas: ComposableComponentSchema[];
}

/**
 * @public
 */
export interface InputGroupComponentSchema<Key extends SingleSchemaKey = SingleSchemaKey>
  extends ControlWrapper<Key>, Labelful, ComponentEventListenerHolder<NzInputGroupComponent>, ComponentPropertyHolder<NzInputGroupComponent> {
  kind: 'input-group';
  before?: string | TemplateRef<void> | { icon: string } | SchemaReactiveFn<InputGroupComponentSchema, string | TemplateRef<void> | { icon: string }>;
  after?: string | TemplateRef<void> | { icon: string } | SchemaReactiveFn<InputGroupComponentSchema, string | TemplateRef<void> | { icon: string }>;
  prefix?: string | TemplateRef<void> | { icon: string } | SchemaReactiveFn<InputGroupComponentSchema, string | TemplateRef<void> | { icon: string }>;
  suffix?: string | TemplateRef<void> | { icon: string } | SchemaReactiveFn<InputGroupComponentSchema, string | TemplateRef<void> | { icon: string }>;
  size?: NzSizeLDSType;
  primary?: SchemaKey;
  compact?: boolean;
}

/**
 * @public
 */
export interface NumberGroupComponentSchema<Key extends SingleSchemaKey = SingleSchemaKey>
  extends ControlWrapper<Key>, Labelful, ComponentEventListenerHolder<NzInputNumberGroupComponent>, ComponentPropertyHolder<NzInputNumberGroupComponent> {
  kind: 'number-group';
  before?: string | TemplateRef<void> | { icon: string } | SchemaReactiveFn<NumberGroupComponentSchema, string | TemplateRef<void> | { icon: string }>;
  after?: string | TemplateRef<void> | { icon: string } | SchemaReactiveFn<NumberGroupComponentSchema, string | TemplateRef<void> | { icon: string }>;
  prefix?: string | TemplateRef<void> | { icon: string } | SchemaReactiveFn<NumberGroupComponentSchema, string | TemplateRef<void> | { icon: string }>;
  suffix?: string | TemplateRef<void> | { icon: string } | SchemaReactiveFn<NumberGroupComponentSchema, string | TemplateRef<void> | { icon: string }>;
  size?: NzSizeLDSType;
  primary?: SchemaKey;
  compact?: boolean;
}
