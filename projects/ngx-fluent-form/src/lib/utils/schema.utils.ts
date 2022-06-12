import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AnyControlBuilder, AnyControlSchema, RealControlBuilder, RealControlSchema, VirtualControlSchema } from '../models/schema.model';
import { Builder, isBuilder } from './builder.utils';

const VIRTUAL_CONTROL_TYPES = ['group', 'array'];

const isVirtualControlSchema = (schema: AnyControlSchema): schema is VirtualControlSchema => (
  VIRTUAL_CONTROL_TYPES.includes(schema.type)
);

const standardSchema = (schema: AnyControlSchema | Builder<AnyControlSchema, AnyControlSchema, {}>) => {
  const _schema = isBuilder(schema) ? schema.build() : schema;

  if (isVirtualControlSchema(_schema)) {
    _schema.schemas = standardSchemas(_schema.schemas);
  }

  return _schema;
};

const addValidatorToSchema = (schema: RealControlSchema, ...validator: ValidatorFn[]) => {
  if (schema.validator) {
    schema.validator.push(...validator);
  } else {
    schema.validator = [...validator];
  }
}

export const standardSchemas = (schemas: (AnyControlSchema | AnyControlBuilder)[]) => (
  schemas.map(schema => standardSchema(schema))
);

export function convertSchemaToControl(schema: RealControlSchema | RealControlBuilder): FormControl {
  const _schema = isBuilder(schema) ? schema.build() : schema;

  if (_schema.type === 'email') {
    addValidatorToSchema(_schema, Validators.email);
  }

  if (_schema.required) {
    addValidatorToSchema(_schema, Validators.required);
  }

  return new FormControl(
    { value: _schema.value ?? null, disabled: _schema.disabled },
    _schema.validator,
    _schema.asyncValidator
  );
}

export function convertSchemasToGroup(schemas: (AnyControlSchema | AnyControlBuilder)[]): FormGroup {
  return new FormGroup(
    schemas.reduce((controls, schema) => {
      const _schema = isBuilder(schema) ? schema.build() : schema;

      switch (_schema.type) {
        case 'group':
          controls[_schema.name.toString()] = convertSchemasToGroup(_schema.schemas);
          break;

        case 'array':
          controls[_schema.name.toString()] = convertSchemasToArray(_schema.schemas);
          break;

        default:
          controls[_schema.name.toString()] = convertSchemaToControl(_schema);
      }

      return controls;
    }, {} as Record<string, AbstractControl>)
  );
}

export function convertSchemasToArray(schemas: (AnyControlSchema | AnyControlBuilder)[]): FormArray {
  return new FormArray(
    schemas.map(schema => {
      const _schema = isBuilder(schema) ? schema.build() : schema;

      switch (_schema.type) {
        case 'group':
          return convertSchemasToGroup(_schema.schemas);

        case 'array':
          return convertSchemasToArray(_schema.schemas);

        default:
          return convertSchemaToControl(_schema);
      }
    })
  );
}
