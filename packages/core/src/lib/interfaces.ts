import type { ValidatorFn } from '@angular/forms';
import type { AbstractSchema } from './schemas';
import type { SchemaType } from './schemas/interfaces';

export interface SchemaConfig<S extends AbstractSchema> {
  type: SchemaType;
  /** Add built-in validators from the schema. */
  validators?: (schema: S) => ValidatorFn[];
}
