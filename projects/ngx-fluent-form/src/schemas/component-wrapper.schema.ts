import { NzButtonComponent, NzButtonSize } from 'ng-zorro-antd/button';
import { AbstractSchema } from './abstract.schema';
import { ButtonComponentSchema } from './component.schema';
import { ComponentEventListenerHolder, ComponentPropertyHolder, Labelful } from './interfaces';
import { SchemaKey } from './types';

/**
 * @public
 */
export interface ButtonGroupComponentSchema<Key extends SchemaKey = SchemaKey>
  extends AbstractSchema<Key>, Labelful, ComponentEventListenerHolder<NzButtonComponent>, ComponentPropertyHolder<NzButtonComponent> {
  kind: 'button-group';
  schemas: ButtonComponentSchema[];
  size?: NzButtonSize;
}
