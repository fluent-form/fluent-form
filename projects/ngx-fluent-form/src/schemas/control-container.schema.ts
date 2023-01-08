import { AbstractControlContainerSchema, SchemaName } from './abstract.schema';
import { AnyControlContainerBuilder, AnyControlContainerSchema, SingleKeyControlBuilder, SingleKeyControlSchema } from './index.schema';

export interface FormGroupSchema<Name extends SchemaName = SchemaName> extends AbstractControlContainerSchema<Name> {
  kind: 'group';
}

export interface FormArraySchema<Name extends SchemaName = SchemaName> extends AbstractControlContainerSchema<Name> {
  kind: 'array';
  schemas: (SingleKeyControlSchema<number> | SingleKeyControlBuilder<number> | AnyControlContainerSchema<number> | AnyControlContainerBuilder<number>)[];
}