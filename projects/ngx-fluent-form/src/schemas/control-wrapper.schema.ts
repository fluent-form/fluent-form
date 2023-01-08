import { TemplateRef } from '@angular/core';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzInputGroupComponent } from 'ng-zorro-antd/input';
import { AbstractComponentSchema, AbstractLabelfulSchema, AbstractSchema, AnySchemaName, SchemaName } from './abstract.schema';
import { ComposableComponentBuilder, ComposableComponentSchema } from './index.schema';

export interface ControlWrapper {
  schemas: (ComposableComponentSchema | ComposableComponentBuilder)[];
}

export interface InputGroupComponentSchema<Name extends SchemaName = SchemaName>
  extends AbstractSchema<Name>, ControlWrapper, AbstractComponentSchema<NzInputGroupComponent>, AbstractLabelfulSchema {
  kind: 'input-group';
  before?: string | TemplateRef<void> | { icon: string };
  after?: string | TemplateRef<void> | { icon: string };
  prefix?: string | TemplateRef<void> | { icon: string };
  suffix?: string | TemplateRef<void> | { icon: string };
  size?: NzSizeLDSType;
  primary?: AnySchemaName;
}
