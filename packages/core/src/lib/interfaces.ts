import { ValidatorFn } from '@angular/forms';
import { AbstractSchema } from './schemas';
import { SchemaType } from './schemas/interfaces';

export interface SchemaConfig<S extends AbstractSchema> {
  type: SchemaType;
  /** Add built-in validators from the schema. */
  validators?: (schema: S) => ValidatorFn[];
}
