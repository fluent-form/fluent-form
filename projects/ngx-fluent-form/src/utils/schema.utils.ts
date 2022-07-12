import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { InputControlSchema, TextareaControlSchema } from '../schemas';
import { AnySchemaName, DoubleKeySchemaName, SingleKeySchemaName } from '../schemas/abstract.schema';
import { AnyControlSchema, AnySchema, ComponentSchema, ComposableComponentSchema, ContainerSchema, ControlSchema } from '../schemas/index.schema';
import { Builder, isBuilder } from './builder.utils';

const CONTAINER_SCHEMA_TYPES = ['group', 'array', 'input-group'];
const TEXT_CONTROL_SCHEMA_TYPES = ['input', 'textarea'];
const COMPONENT_SCHEMA_TYPES = ['button'];

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
 * 是否为组件图示
 * @param schema
 */
export const isComponentSchema = (schema: AnySchema): schema is ComponentSchema => (
  COMPONENT_SCHEMA_TYPES.includes(schema.type)
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
const addValidatorToSchema = <T extends ControlSchema>(schema: T, validator: ValidatorFn | ValidatorFn[]) => {
  const validators = Array.isArray(validator) ? validator : [validator];

  if (schema.validator) {
    schema.validator = schema.validator.concat(validators);
  } else {
    schema.validator = validators;
  }

  return schema;
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
    schema = addValidatorToSchema(schema, Validators.email);
  }

  if (schema.length) {
    if (typeof schema.length === 'number') {
      schema = addValidatorToSchema(schema, [
        Validators.minLength(schema.length),
        Validators.maxLength(schema.length)
      ]);
    } else {
      const { min, max } = schema.length as { max?: number, min?: number };
      if (min) {
        schema = addValidatorToSchema(schema, Validators.minLength(min));
      }

      if (max) {
        schema = addValidatorToSchema(schema, Validators.maxLength(max));
      }
    }
  }

  return schema;
}

/**
 * 标准化图示
 * @param schema
 */
export const standardSchema = <T extends AnySchema>(schema: T | Builder<T, T, {}>): T => {
  let _schema = (isBuilder(schema) ? schema.build() : { ...schema }) as AnySchema;

  if (isContainerSchema(_schema)) {
    _schema = standardContainerSchema(_schema);
  } else if (isTextControlSchema(_schema)) {
    _schema = standardTextControlSchema(_schema);
  }

  if ('required' in _schema && _schema.required) {
    _schema = addValidatorToSchema(_schema as ControlSchema, Validators.required);
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
export function convertSchemaToControl(schema: ControlSchema): FormControl {
  return new FormControl(
    { value: schema.value ?? null, disabled: schema.disabled },
    schema.validator,
    schema.asyncValidator
  );
}

/**
 * 将图示组转换为表单组
 * @param schemas 标准化后的图示
 */
export function convertSchemasToGroup(schemas: AnySchema[]): FormGroup {
  return new FormGroup(
    schemas.filter(o => !isComponentSchema(o)).reduce((controls, schema) => {
      switch (schema.type) {
        case 'group':
          controls[schema.name!.toString()] = convertSchemasToGroup(schema.schemas as AnySchema[]);
          break;

        case 'array':
          controls[schema.name!.toString()] = convertSchemasToArray(schema.schemas as AnyControlSchema[]);
          break;

        case 'input-group':
          (schema.schemas as ComposableComponentSchema[]).filter(o => !isComponentSchema(o)).forEach(subschema => {
            controls[subschema.name!.toString()] = convertSchemaToControl(subschema as ControlSchema);
          });
          break;

        default:
          controls[schema.name!.toString()] = convertSchemaToControl(schema as ControlSchema);
      }

      return controls;
    }, {} as Record<string, AbstractControl>)
  );
}

/**
 * 将图示组转换为表单数组
 * @param schemas 标准化后的图示
 */
export function convertSchemasToArray(schemas: AnyControlSchema[]): FormArray {
  return new FormArray(
    schemas.map(schema => {
      switch (schema.type) {
        case 'group':
          return convertSchemasToGroup(schema.schemas as AnySchema[]);

        case 'array':
          return convertSchemasToArray(schema.schemas as AnyControlSchema[]);

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
