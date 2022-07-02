import { AbstractSchema, SingleKeySchemaName } from './abstract.schema';
import { AnyBuilder, AnySchema, FormBuilder, FormSchema, SingleKeyControlBuilder, SingleKeyControlSchema } from './index.schema';

export interface FormGroupSchema<N extends SingleKeySchemaName = SingleKeySchemaName> extends AbstractSchema<N> {
  type: 'group';
  schemas: (AnySchema | AnyBuilder)[];
}

export interface FormArraySchema<N extends SingleKeySchemaName = SingleKeySchemaName> extends AbstractSchema<N> {
  type: 'array';
  schemas: (SingleKeyControlSchema<number> | SingleKeyControlBuilder<number> | FormSchema<number> | FormBuilder<number>)[];
}