import { FormGroup } from '@angular/forms';
import { convertSchemasToGroup, standardSchemas } from '../utils/schema.utils';
import { AnyControlBuilder, AnyControlSchema } from './schema.model';

export class FluentGroup {
  readonly form: FormGroup;
  readonly schemas: AnyControlSchema[];

  get controls() {
    return this.form.controls;
  }

  get value() {
    return this.form.value;
  }

  get rawValue() {
    return this.form.getRawValue();
  }

  constructor(schemas: AnyControlSchema[]) {
    this.form = convertSchemasToGroup(schemas);
    this.schemas = schemas;
  }
}

export const form = (...schemas: (AnyControlSchema | AnyControlBuilder)[]) => {
  return new FluentGroup(standardSchemas(schemas));
}
