import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AnyBuilder, AnyControlBuilder, AnyControlSchema, AnySchema, AnySchemaName, ContainerSchema, RealControlBuilder, RealControlSchema, SingleKeySchemaName } from '../models/schema.model';
import { Builder, isBuilder } from './builder.utils';

const CONTAINER_SCHEMA_TYPES = ['group', 'array', 'input-group'];

/**
 * 是否为容器图示
 * @param schema
 */
const isContainerSchema = (schema: AnySchema): schema is ContainerSchema => (
  CONTAINER_SCHEMA_TYPES.includes(schema.type)
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

  if (isContainerSchema(_schema)) {
    const tmp = standardSchemas(_schema.schemas);

    // 如果是数组表单图示，自动补充子图示的名称为索引值
    if (_schema.type === 'array') {
      tmp.forEach((schema, index) => schema.name = index);
    }

    _schema.schemas = tmp;
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
  const _schema = standardSchema(schema);

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
export function convertSchemasToGroup(schemas: (AnySchema | AnyBuilder)[]): FormGroup {
  return new FormGroup(
    standardSchemas(schemas).reduce((controls, schema) => {
      switch (schema.type) {
        case 'group':
          controls[schema.name!.toString()] = convertSchemasToGroup(schema.schemas);
          break;

        case 'array':
          controls[schema.name!.toString()] = convertSchemasToArray(schema.schemas);
          break;

        case 'input-group':
          standardSchemas(schema.schemas).forEach(schema => {
            controls[schema.name!.toString()] = convertSchemaToControl(schema);
          });
          break;

        default:
          controls[schema.name!.toString()] = convertSchemaToControl(schema);
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
    standardSchemas(schemas).map(schema => {
      switch (schema.type) {
        case 'group':
          return convertSchemasToGroup(schema.schemas);

        case 'array':
          return convertSchemasToArray(schema.schemas);

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
export function findSchema<T extends AnySchema = AnySchema>(schemas: AnySchema[], name: AnySchemaName): T | undefined;
export function findSchema<T extends AnySchema = AnySchema>(schemas: AnySchema[], path: [...SingleKeySchemaName[], AnySchemaName]): T | undefined;
export function findSchema<T extends AnySchema = AnySchema>(schemas: AnySchema[], path: AnySchemaName | [...SingleKeySchemaName[], AnySchemaName]): T | undefined;
export function findSchema<T extends AnySchema = AnySchema>(schemas: AnySchema[], path: AnySchemaName | [...SingleKeySchemaName[], AnySchemaName]): T | undefined {
  // 如果是数组，那么除了最后一个元素，其他元素所对应的 schema 一定是 group/array schema
  if (Array.isArray(path)) {
    const [endPath, ...beforePath] = path.reverse() as [AnySchemaName, ...SingleKeySchemaName[]];
    schemas = beforePath.reduceRight((schemas, name) => (
      (schemas.find(o => o.name === name) as ContainerSchema).schemas as AnyControlSchema[]
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
