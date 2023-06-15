import { inject, Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { AnyComponentContainerSchema, AnyComponentSchema, AnyComponentWrapperSchema, AnyContainerSchema, AnyControlContainerSchema, AnyControlOrControlContainerSchema, AnyControlSchema, AnyControlWrapperSchema, AnySchema, AnySchemaKey, DoubleKeyControlSchema, SchemaKey, StandardSchema } from '../schemas';
import { SchemaLike, SchemaType } from '../schemas/interfaces';
import { SCHEMA_MAP } from '../tokens';
import { isBuilder, StableBuilder } from './builder.utils';

@Injectable({
  providedIn: 'root'
})
export class SchemaUtil {
  private readonly schemaMap = inject(SCHEMA_MAP);

  patchSchemas<T extends StandardSchema<AnySchema>[]>(schemas: T) {
    return schemas.map(schema => this.patchSchema(schema));
  }

  patchSchema<T extends StandardSchema<AnySchema>>(schema: T): T {
    if ('schemas' in schema) {
      schema.schemas = this.patchSchemas(schema.schemas);
    }

    return this.schemaMap.get(schema.kind)?.patch?.(schema) ?? schema;
  }

  isControlContainerSchema(schema: SchemaLike): schema is AnyControlContainerSchema {
    return this.typeOf(schema) === SchemaType.ControlContainer;
  }

  isControlWrapperSchema(schema: SchemaLike): schema is AnyControlWrapperSchema {
    return this.typeOf(schema) === SchemaType.ControlWrapper;
  }

  isComponentContainerSchema(schema: SchemaLike): schema is AnyComponentContainerSchema {
    return this.typeOf(schema) === SchemaType.ComponentContainer;
  }

  isComponentWrapperSchema(schema: SchemaLike): schema is AnyComponentWrapperSchema {
    return this.typeOf(schema) === SchemaType.ComponentWrapper;
  }

  isComponentSchema(schema: SchemaLike): schema is AnyComponentSchema {
    return this.typeOf(schema) === SchemaType.Component;
  }

  isNonControlSchema(schema: SchemaLike): schema is AnyComponentSchema | AnyComponentWrapperSchema {
    return this.isComponentSchema(schema) || this.isComponentWrapperSchema(schema);
  }

  typeOf(schema: SchemaLike) {
    return this.schemaMap.get(schema.kind)?.type;
  }

  validatorsOf(schema: StandardSchema<AnyControlSchema>) {
    const validators: ValidatorFn[] = this.schemaMap.get(schema.kind)?.validators?.(schema) ?? [];

    // TODO required 可能是个函数，需要动态
    schema.required && validators.push(Validators.required);

    return validators;
  }
}

/**
 * 是否为双字段图示
 * @param schema
 */
export function isDoubleKeyControlSchema(schema: SchemaLike): schema is DoubleKeyControlSchema {
  return Array.isArray(schema.key);
}

/**
 * 标准化图示
 * @param schemaOrSchemaBuilder
 */
export function standardSchema<T extends AnySchema>(schemaOrSchemaBuilder: T | StableBuilder<T>): StandardSchema<T> {
  const schema = (isBuilder(schemaOrSchemaBuilder) ? schemaOrSchemaBuilder.build() : { ...schemaOrSchemaBuilder });

  if ('schemas' in schema) {
    const schemas = standardSchemas(schema.schemas);

    // 如果是数组表单图示，自动补充子图示的名称为索引值
    if (schema.kind === 'array') {
      schemas.forEach((schema, index) => schema.key = index);
    }

    schema.schemas = schemas;
  }

  return schema as StandardSchema<T>;
}

/**
 * 标准化所有图示
 * @param schemas
 */
export function standardSchemas<T extends (AnySchema | StableBuilder<AnySchema>)[]>(schemas: T) {
  return schemas.map(schema => standardSchema(schema));
}

export function schemasUtils<S extends StandardSchema<AnySchema>[]>(schemas: S) {
  return new SchemasUtils(schemas);
}

export class SchemasUtils<S extends AnySchema[]> {
  constructor(private readonly schemas: S) { }

  find<T extends AnySchema>(key: AnySchemaKey): T | null;
  find<T extends AnySchema>(path: [...SchemaKey[], AnySchemaKey]): T | null;
  find<T extends AnySchema>(path: AnySchemaKey | [...SchemaKey[], AnySchemaKey]): T | null;
  find<T extends AnySchema>(path: AnySchemaKey | [...SchemaKey[], AnySchemaKey]): T | null {
    let schemas = this.schemas as AnySchema[];
    // 如果是数组，那么除了最后一个元素，其他元素所对应的 schema 一定是 container schema
    if (Array.isArray(path)) {
      const [endPath, ...beforePath] = path.reverse() as [AnySchemaKey, ...SchemaKey[]];
      schemas = beforePath.reduceRight((schemas, name) => (
        (schemas.find(o => o.key === name) as AnyContainerSchema).schemas as AnyControlOrControlContainerSchema[]
      ), schemas as AnyControlOrControlContainerSchema[]);
      path = endPath;
    }

    return (schemas.find(o => {
      // 处理双字段模式
      if (Array.isArray(o.key) && Array.isArray(path)) {
        return arraysEqual(o.key, path);
      }

      return o.key === path;
    }) ?? null) as T | null;
  }
}

/** @internal */
function arraysEqual(a: unknown[], b: unknown[]): boolean {
  if (a === b) return true;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}
