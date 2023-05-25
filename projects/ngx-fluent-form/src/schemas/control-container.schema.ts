import { AbstractControlContainerSchema } from './abstract.schema';
import { AnyControlContainerBuilder, AnyControlContainerSchema, SingleKeyControlBuilder, SingleKeyControlSchema } from './index.schema';
import { SchemaKey } from './types';

export interface FormGroupSchema<Key extends SchemaKey = SchemaKey> extends AbstractControlContainerSchema<Key> {
  kind: 'group';
}

export interface FormArraySchema<Key extends SchemaKey = SchemaKey> extends AbstractControlContainerSchema<Key> {
  kind: 'array';
  schemas: (SingleKeyControlSchema<number> | SingleKeyControlBuilder<number> | AnyControlContainerSchema<number> | AnyControlContainerBuilder<number>)[];
}
