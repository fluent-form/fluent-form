import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { InputControlSchema, TextareaControlSchema } from '../schemas';
import { AnySchemaName, DoubleKeySchemaName, SingleKeySchemaName } from '../schemas/abstract.schema';
import { AnyBuilder, AnyControlBuilder, AnyControlSchema, AnySchema, ContainerSchema, ControlBuilder, ControlSchema } from '../schemas/index.schema';
import { Builder, isBuilder } from './builder.utils';

const CONTAINER_SCHEMA_TYPES = ['group', 'array', 'input-group'];
const TEXT_CONTROL_SCHEMA_TYPES = ['input', 'textarea'];

/**
 * 是否为容器图示
 * @param schema
 */
export const isContainerSchema = (schema: AnySchema): schema is ContainerSchema => (
  CONTAINER_SCHEMA_TYPES.includes(schema.type)
);

/**
 * 是否为文本图示
 * @param schema
 */
export const isTextControlSchema = (schema: AnySchema): schema is InputControlSchema | TextareaControlSchema => (
  TEXT_CONTROL_SCHEMA_TYPES.includes(schema.type)
);

/**
 * 是否为双字段
 * @param name
 */
export const isDoubleKeySchemaName = (name: AnySchemaName): name is DoubleKeySchemaName => (
  Array.isArray(name)
);

/**
 * 添加验证器到图示中
 * @param schema
 * @param validator
 */
const addValidatorToSchema = (schema: ControlSchema, validator: ValidatorFn | ValidatorFn[]) => {
  const validators = Array.isArray(validator) ? validator : [validator]

  if (schema.validator) {
    schema.validator = schema.validator.concat(validators);
  } else {
    schema.validator = validators;
  }
}

/**
 * 标准化容器图示
 * @param schema
 */
const standardContainerSchema = <T extends ContainerSchema>(schema: T): T => {
  const schemas = standardSchemas(schema.schemas);

  // 如果是数组表单图示，自动补充子图示的名称为索引值
  if (schema.type === 'array') {
    schemas.forEach((schema, index) => schema.name = index);
  }

  schema.schemas = schemas;

  return schema;
}

/**
 * 标准化文本控件图示
 * @param schema
 */
const standardTextControlSchema = <T extends InputControlSchema | TextareaControlSchema>(schema: T): T => {
  if (schema.type === 'input' && schema.subtype === 'email') {
    addValidatorToSchema(schema, Validators.email);
  }

  if (schema.length) {
    if (typeof schema.length === 'number') {
      addValidatorToSchema(schema, [
        Validators.minLength(schema.length),
        Validators.maxLength(schema.length)
      ]);
    } else {
      const { min, max } = schema.length as { max?: number, min?: number };
      min && addValidatorToSchema(schema, Validators.minLength(min));
      max && addValidatorToSchema(schema, Validators.maxLength(max));
    }
  }

  return schema;
}

/**
 * 标准化图示
 * @param schema
 */
export const standardSchema = <T extends AnySchema>(schema: T | Builder<T, T, {}>): T => {
  let _schema = (isBuilder(schema) ? schema.build() : schema) as AnySchema;

  if (isContainerSchema(_schema)) {
    return standardContainerSchema(_schema) as T;
  }

  if (isTextControlSchema(_schema)) {
    standardTextControlSchema(_schema);
  }

  if ('required' in _schema && _schema.required) {
    addValidatorToSchema(_schema as ControlSchema, Validators.required);
  }

  return _schema as T;
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
export function convertSchemaToControl(schema: ControlSchema | ControlBuilder): FormControl {
  const _schema = standardSchema(schema);

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
          standardSchemas(schema.schemas).forEach(subschema => {
            controls[subschema.name!.toString()] = convertSchemaToControl(subschema);
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
  // 如果是数组，那么除了最后一个元素，其他元素所对应的 schema 一定是 container schema
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
