import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AnyControlBuilder, AnyControlSchema, RealControlBuilder, RealControlSchema, VirtualControlSchema } from '../models/schema.model';
import { Builder, isBuilder } from './builder.utils';

const VIRTUAL_CONTROL_TYPES = ['group', 'array'];

/**
 * 是否为虚拟控件
 * @param schema
 */
const isVirtualControlSchema = (schema: AnyControlSchema): schema is VirtualControlSchema => (
  VIRTUAL_CONTROL_TYPES.includes(schema.type)
);

/**
 * 添加验证器到图示中
 * @param schema
 * @param validator
 */
const addValidatorToSchema = (schema: RealControlSchema, ...validator: ValidatorFn[]) => {
  if (schema.validator) {
    schema.validator.push(...validator);
  } else {
    schema.validator = [...validator];
  }
}

/**
 * 标准化图示
 * @param schema
 */
const standardSchema = <T extends AnyControlSchema>(schema: T | Builder<T, T, {}>): T => {
  const _schema = (isBuilder(schema) ? schema.build() : schema) as T;

  if (isVirtualControlSchema(_schema)) {
    _schema.schemas = standardSchemas(_schema.schemas);
  }

  return _schema;
};

/**
 * 标准化所有图示
 * @param schemas
 */
export const standardSchemas = <T extends AnyControlSchema[]>(schemas: (T[number] | Builder<T[number], T[number], {}>)[]): T => (
  schemas.map(schema => standardSchema(schema))
) as T;

/**
 * 将图示转换为控件
 * @param schema
 */
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

/**
 * 将图示组转换为表单组
 * @param schemas
 */
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

/**
 * 将图示组转换为表单数组
 * @param schemas
 */
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
