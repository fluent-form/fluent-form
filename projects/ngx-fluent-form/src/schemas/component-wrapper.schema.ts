import { NzButtonComponent, NzButtonSize } from 'ng-zorro-antd/button';
import { StableBuilder } from '../utils';
import { AbstractComponentSchema, AbstractLabelfulSchema, AbstractSchema, SchemaName } from './abstract.schema';
import { ButtonComponentSchema } from './component.schema';

export interface ButtonGroupComponentSchema<Name extends SchemaName = SchemaName>
  extends AbstractSchema<Name>, AbstractComponentSchema<NzButtonComponent>, AbstractLabelfulSchema {
  kind: 'button-group';
  schemas: (ButtonComponentSchema | StableBuilder<ButtonComponentSchema>)[];
  size?: NzButtonSize;
}