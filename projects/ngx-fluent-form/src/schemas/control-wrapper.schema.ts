import { TemplateRef } from '@angular/core';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzInputNumberGroupComponent } from 'ng-zorro-antd/input-number';
import { Indexable } from '../types';
import { AbstractBranchSchema, AbstractControlSchema } from './abstract.schema';
import { ComponentEventListenerHolder, ComponentPropertyHolder, Labelful, MaybeSchemaReactiveFn } from './interfaces';
import { SchemaKey, SingleSchemaKey } from './types';

/**
 * @public
 */
export interface AbstractControlWrapperSchema<Key extends SingleSchemaKey = SingleSchemaKey> extends AbstractBranchSchema<Key> {
  schemas: Indexable<AbstractControlSchema>[];
}

/**
 * @public
 */
export interface InputGroupComponentSchema<Key extends SingleSchemaKey = SingleSchemaKey>
  extends AbstractControlWrapperSchema<Key>, Labelful, ComponentEventListenerHolder<NzInputGroupComponent>, ComponentPropertyHolder<NzInputGroupComponent> {
  kind: 'input-group';
  before?: MaybeSchemaReactiveFn<InputGroupComponentSchema, string | TemplateRef<void> | { icon: string } | null>;
  after?: MaybeSchemaReactiveFn<InputGroupComponentSchema, string | TemplateRef<void> | { icon: string } | null>;
  prefix?: MaybeSchemaReactiveFn<InputGroupComponentSchema, string | TemplateRef<void> | { icon: string } | null>;
  suffix?: MaybeSchemaReactiveFn<InputGroupComponentSchema, string | TemplateRef<void> | { icon: string } | null>;
  size?: NzSizeLDSType;
  primary?: SchemaKey;
  compact?: boolean;
}

/**
 * @public
 */
export interface NumberGroupComponentSchema<Key extends SingleSchemaKey = SingleSchemaKey>
  extends AbstractControlWrapperSchema<Key>, Labelful, ComponentEventListenerHolder<NzInputNumberGroupComponent>, ComponentPropertyHolder<NzInputNumberGroupComponent> {
  kind: 'number-group';
  before?: MaybeSchemaReactiveFn<NumberGroupComponentSchema, string | TemplateRef<void> | { icon: string } | null>;
  after?: MaybeSchemaReactiveFn<NumberGroupComponentSchema, string | TemplateRef<void> | { icon: string } | null>;
  prefix?: MaybeSchemaReactiveFn<NumberGroupComponentSchema, string | TemplateRef<void> | { icon: string } | null>;
  suffix?: MaybeSchemaReactiveFn<NumberGroupComponentSchema, string | TemplateRef<void> | { icon: string } | null>;
  size?: NzSizeLDSType;
  primary?: SchemaKey;
  compact?: boolean;
}
