import { AbstractSchema } from './abstract.schema';
import { Labelful, PropertyHolder } from './interfaces';
import { SchemaName } from './types';

export interface TemplateSchema<Name extends SchemaName = SchemaName> extends AbstractSchema<Name>, Labelful, PropertyHolder {
  kind: 'template';
}
