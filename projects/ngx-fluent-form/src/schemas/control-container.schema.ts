import { AbstractControlContainerSchema } from './abstract.schema';
import { Length } from './interfaces';
import { SchemaKey } from './types';

export interface FormGroupSchema<Key extends SchemaKey = SchemaKey> extends AbstractControlContainerSchema<Key> {
  kind: 'group';
}

export interface FormArraySchema<Key extends SchemaKey = SchemaKey> extends AbstractControlContainerSchema<Key> {
  kind: 'array';
  length?: Length;
  addable?: boolean;
  removable?: boolean;
}
