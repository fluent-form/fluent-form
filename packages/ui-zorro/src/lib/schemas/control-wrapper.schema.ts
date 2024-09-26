import { TemplateRef } from '@angular/core';
import { AbstractControlWrapperSchema, ComponentEventListenerHolder, ComponentPropertyHolder, MaybeSchemaReactiveFn, SchemaKey, SingleSchemaKey } from '@fluent-form/core';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzFlexDirective } from 'ng-zorro-antd/flex';
import { NzInputGroupComponent } from 'ng-zorro-antd/input';
import { Labelful } from './interfaces';

/**
 * @public
 */
export interface InputGroupComponentSchema<Key extends SingleSchemaKey = SingleSchemaKey>
  extends AbstractControlWrapperSchema<Key>, Labelful, ComponentEventListenerHolder<NzInputGroupComponent>, ComponentPropertyHolder<NzInputGroupComponent> {
  kind: 'input-group';
  addons?: {
    before?: MaybeSchemaReactiveFn<InputGroupComponentSchema, string | TemplateRef<void> | { icon: string } | null>;
    after?: MaybeSchemaReactiveFn<InputGroupComponentSchema, string | TemplateRef<void> | { icon: string } | null>;
  };
  size?: NzSizeLDSType;
  primary?: SchemaKey;
}

export interface InputAddonComponentSchema<Key extends SingleSchemaKey = SingleSchemaKey> extends AbstractControlWrapperSchema<Key> {
  kind: 'input-addon';
}

export interface SpaceComponentSchema<Key extends SingleSchemaKey = SingleSchemaKey>
  extends AbstractControlWrapperSchema<Key>, Labelful, ComponentEventListenerHolder<NzFlexDirective>, ComponentPropertyHolder<NzFlexDirective> {
  kind: 'space';
  vertical?: boolean
  wrap?: NzFlexDirective['nzWrap']
  justify?: NzFlexDirective['nzJustify']
  align?: NzFlexDirective['nzAlign']
  flex?: NzFlexDirective['nzFlex']
  gap?: NzFlexDirective['nzGap']
}
