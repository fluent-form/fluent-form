import { SafeAny } from '@ngify/types';
import { AbstractSchema, SchemaType } from '../schemas';

export type SchemaSelector = '*' | string | SchemaType | (string | SchemaType)[];

export type SchemaPatchFn<S extends AbstractSchema> = (schema: S & Record<string, SafeAny>) => S;

export interface SchemaPatcher<S extends AbstractSchema = AbstractSchema> {
  selector: SchemaSelector;
  patch: SchemaPatchFn<S>;
}
