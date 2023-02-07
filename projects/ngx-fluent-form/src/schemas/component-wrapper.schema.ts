import { NzButtonComponent, NzButtonSize } from 'ng-zorro-antd/button';
import { StableBuilder } from '../utils';
import { AbstractComponentSchema, AbstractSchema } from './abstract.schema';
import { ButtonComponentSchema } from './component.schema';
import { Labelful } from './interfaces';
import { SchemaName } from './types';

export interface ButtonGroupComponentSchema<Name extends SchemaName = SchemaName>
  extends AbstractSchema<Name>, AbstractComponentSchema<NzButtonComponent>, Labelful {
  kind: 'button-group';
  schemas: (ButtonComponentSchema | StableBuilder<ButtonComponentSchema>)[];
  size?: NzButtonSize;
}
