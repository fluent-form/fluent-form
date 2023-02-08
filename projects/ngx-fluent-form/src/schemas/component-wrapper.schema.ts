import { NzButtonComponent, NzButtonSize } from 'ng-zorro-antd/button';
import { StableBuilder } from '../utils';
import { AbstractSchema } from './abstract.schema';
import { ButtonComponentSchema } from './component.schema';
import { ComponentEventListener, ComponentPropertyPatcher, Labelful } from './interfaces';
import { SchemaName } from './types';

export interface ButtonGroupComponentSchema<Name extends SchemaName = SchemaName>
  extends AbstractSchema<Name>, Labelful, ComponentEventListener<NzButtonComponent>, ComponentPropertyPatcher<NzButtonComponent> {
  kind: 'button-group';
  schemas: (ButtonComponentSchema | StableBuilder<ButtonComponentSchema>)[];
  size?: NzButtonSize;
}
