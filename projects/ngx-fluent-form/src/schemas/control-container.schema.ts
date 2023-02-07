import { AbstractControlContainerSchema } from './abstract.schema';
import { AnyControlContainerBuilder, AnyControlContainerSchema, SingleKeyControlBuilder, SingleKeyControlSchema } from './index.schema';
import { SchemaName } from './types';

export interface FormGroupSchema<Name extends SchemaName = SchemaName> extends AbstractControlContainerSchema<Name> {
  kind: 'group';
}

export interface FormArraySchema<Name extends SchemaName = SchemaName> extends AbstractControlContainerSchema<Name> {
  kind: 'array';
  schemas: (SingleKeyControlSchema<number> | SingleKeyControlBuilder<number> | AnyControlContainerSchema<number> | AnyControlContainerBuilder<number>)[];
}
