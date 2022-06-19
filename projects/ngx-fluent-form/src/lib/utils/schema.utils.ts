import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AnyControlName, AnyControlSchema, AnySchema, RealControlBuilder, RealControlSchema, SingleKeyControlName, VirtualControlSchema } from '../models/schema.model';
import { Builder, isBuilder } from './builder.utils';

const VIRTUAL_CONTROL_TYPES = ['group', 'array'];

/**
 * 是否为虚拟控件
 * @param schema
 */
const isVirtualControlSchema = (schema: AnySchema): schema is VirtualControlSchema => (
  VIRTUAL_CONTROL_TYPES.includes(schema.type)
);

/**
 * 添加验证器到图示中
 * @param schema
 * @param validator
 */
const addValidatorToSchema = (schema: RealControlSchema, validator: ValidatorFn) => {
  if (schema.validator) {
    schema.validator.push(validator);
  } else {
    schema.validator = [validator];
  }
}

/**
 * 标准化图示
 * @param schema
 */
export const standardSchema = <T extends AnySchema>(schema: T | Builder<T, T, {}>): T => {
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
export const standardSchemas = <T extends AnySchema>(schemas: (T | Builder<T, T, {}>)[]): T[] => (
  schemas.map(schema => standardSchema(schema))
);

/**
 * 将图示转换为控件
 * @param schema
 */
export function convertSchemaToControl(schema: RealControlSchema | RealControlBuilder): FormControl {
  const _schema = isBuilder(schema) ? schema.build() : schema;

  if (_schema.type === 'input' && _schema.subtype === 'email') {
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
export function convertSchemasToGroup(schemas: AnySchema[]): FormGroup {
  return new FormGroup(
    schemas.reduce((controls, schema) => {

      switch (schema.type) {
        case 'group':
          controls[schema.name.toString()] = convertSchemasToGroup(
            standardSchemas(schema.schemas)
          );
          break;

        case 'array':
          controls[schema.name.toString()] = convertSchemasToArray(
            standardSchemas(schema.schemas)
          );
          break;

        case 'input-group':
          standardSchemas(schema.schemas).forEach(schema => {
            controls[schema.name.toString()] = convertSchemaToControl(schema);
          });
          break;

        default:
          controls[schema.name.toString()] = convertSchemaToControl(schema);
      }

      return controls;
    }, {} as Record<string, AbstractControl>)
  );
}

/**
 * 将图示组转换为表单数组
 * @param schemas
 */
export function convertSchemasToArray(schemas: AnyControlSchema[]): FormArray {
  return new FormArray(
    schemas.map(schema => {
      switch (schema.type) {
        case 'group':
          return convertSchemasToGroup(
            standardSchemas(schema.schemas)
          );

        case 'array':
          return convertSchemasToArray(
            standardSchemas(schema.schemas)
          );

        default:
          return convertSchemaToControl(schema);
      }
    })
  );
}

function arraysEqual(a: unknown[], b: unknown[]): boolean {
  if (a === b) return true;
  if (a === null || b === null) return false;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}

/**
 * 从图示列表中搜寻子图示
 * @param schemas
 * @param name
 */
export function findSchema<T extends AnySchema = AnySchema>(schemas: AnySchema[], name: AnyControlName): T | undefined;
export function findSchema<T extends AnySchema = AnySchema>(schemas: AnySchema[], path: [...SingleKeyControlName[], AnyControlName]): T | undefined;
export function findSchema<T extends AnySchema = AnySchema>(schemas: AnySchema[], path: AnyControlName | [...SingleKeyControlName[], AnyControlName]): T | undefined;
export function findSchema<T extends AnySchema = AnySchema>(schemas: AnySchema[], path: AnyControlName | [...SingleKeyControlName[], AnyControlName]): T | undefined {
  // 如果是数组，那么除了最后一个元素，其他元素所对应的 schema 一定是 group/array schema
  if (Array.isArray(path)) {
    const [endPath, ...beforePath] = path.reverse() as [AnyControlName, ...SingleKeyControlName[]];
    schemas = beforePath.reduceRight((schemas, name) => (
      (schemas.find(o => o.name === name) as VirtualControlSchema).schemas as AnyControlSchema[]
    ), schemas as AnyControlSchema[]);
    path = endPath;
  }

  return schemas.find(o => {
    // 处理双字段模式
    if (Array.isArray(o.name) && Array.isArray(path)) {
      return arraysEqual(o.name, path);
    }

    return o.name === path;
  }) as T | undefined;
}
