import { TemplateRef } from '@angular/core';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzInputGroupComponent } from 'ng-zorro-antd/input';
import { AbstractSchema } from './abstract.schema';
import { ComposableComponentBuilder, ComposableComponentSchema } from './index.schema';
import { ComponentEventListener, ComponentPropertyPatcher, Labelful } from './interfaces';
import { AnySchemaName, SchemaName } from './types';

export interface ControlWrapper<Name extends SchemaName> extends AbstractSchema<Name> {
  schemas: (ComposableComponentSchema | ComposableComponentBuilder)[];
}

export interface InputGroupComponentSchema<Name extends SchemaName = SchemaName>
  extends ControlWrapper<Name>, Labelful, ComponentEventListener<NzInputGroupComponent>, ComponentPropertyPatcher<NzInputGroupComponent> {
  kind: 'input-group';
  before?: string | TemplateRef<void> | { icon: string };
  after?: string | TemplateRef<void> | { icon: string };
  prefix?: string | TemplateRef<void> | { icon: string };
  suffix?: string | TemplateRef<void> | { icon: string };
  size?: NzSizeLDSType;
  primary?: AnySchemaName;
}
