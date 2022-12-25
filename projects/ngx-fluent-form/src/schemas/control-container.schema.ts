import { AbstractControlContainerSchema, SchemaName } from './abstract.schema';
import { FormBuilder, FormSchema, SingleKeyControlBuilder, SingleKeyControlSchema } from './index.schema';

export interface FormGroupSchema<Name extends SchemaName = SchemaName> extends AbstractControlContainerSchema<Name> {
  kind: 'group';
}

export interface FormArraySchema<Name extends SchemaName = SchemaName> extends AbstractControlContainerSchema<Name> {
  kind: 'array';
  schemas: (SingleKeyControlSchema<number> | SingleKeyControlBuilder<number> | FormSchema<number> | FormBuilder<number>)[];
}