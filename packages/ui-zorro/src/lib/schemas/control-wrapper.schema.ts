import { AbstractControlWrapperSchema, ComponentEventListenerHolder, ComponentPropertyHolder, SchemaKey, SingleSchemaKey } from '@fluent-form/core';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzFlexDirective } from 'ng-zorro-antd/flex';
import { NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzSpaceCompactComponent } from '../widgets/space-compact/lib/space-compact.component';
import { Labelful } from './interfaces';

/**
 * @public
 */
export interface InputGroupComponentSchema<Key extends SingleSchemaKey = SingleSchemaKey>
  extends AbstractControlWrapperSchema<Key>, Labelful, ComponentEventListenerHolder<NzInputGroupComponent>, ComponentPropertyHolder<NzInputGroupComponent> {
  kind: 'input-group';
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

export interface SpaceCompactComponentSchema<Key extends SingleSchemaKey = SingleSchemaKey>
  extends AbstractControlWrapperSchema<Key>, Labelful, ComponentEventListenerHolder<NzSpaceCompactComponent>, ComponentPropertyHolder<NzSpaceCompactComponent> {
  kind: 'space-compact';
  direction?: ReturnType<NzSpaceCompactComponent['nzDirection']>
  size?: NzSizeLDSType
  variants?: {
    block?: boolean
  }
}
