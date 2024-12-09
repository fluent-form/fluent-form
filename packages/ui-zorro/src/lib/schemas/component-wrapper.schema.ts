import { AbstractComponentWrapperSchema, ComponentEventListenerHolder, ComponentEventObserverHolder, ComponentPropertyHolder, SingleSchemaKey } from '@fluent-form/core';
import { NzButtonComponent, NzButtonSize } from 'ng-zorro-antd/button';
import { ButtonComponentSchema } from './component.schema';
import { Labelful } from './interfaces';

/**
 * @public
 */
export interface ButtonGroupComponentSchema<Key extends SingleSchemaKey = SingleSchemaKey>
  extends AbstractComponentWrapperSchema<Key>, Labelful, ComponentEventListenerHolder<NzButtonComponent>, ComponentEventObserverHolder<NzButtonComponent>, ComponentPropertyHolder<NzButtonComponent> {
  kind: 'button-group';
  schemas: ButtonComponentSchema[];
  size?: NzButtonSize;
}
