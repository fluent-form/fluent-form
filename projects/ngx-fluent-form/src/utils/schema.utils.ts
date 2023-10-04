import { inject, Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { AnyComponentContainerSchema, AnyComponentSchema, AnyComponentWrapperSchema, AnyContainerSchema, AnyControlContainerSchema, AnyControlSchema, AnyControlWrapperSchema, AnySchema, AnySchemaKey, DoubleKeyControlSchema, SchemaKey } from '../schemas';
import { SchemaLike, SchemaType } from '../schemas/interfaces';
import { SCHEMA_MAP, SCHEMA_PATCHERS } from '../tokens';
import { isString } from './is.utils';

const ANY_SCHEMA_SELECTOR = '*';

@Injectable({
  providedIn: 'root'
})
export class SchemaUtil {
  private readonly schemaMap = inject(SCHEMA_MAP);
  private readonly schemaPatchers = inject(SCHEMA_PATCHERS, { optional: true }) ?? [];

  patchSchemas<T extends AnySchema[]>(schemas: T) {
    return schemas.map(schema => this.patchSchema(schema));
  }

  patchSchema<T extends AnySchema>(schema: T): T {
    if ('schemas' in schema) {
      schema.schemas = this.patchSchemas(schema.schemas);
    }

    return this.schemaPatchers
      .filter(patcher => {
        if (isString(patcher.selector)) {
          return patcher.selector === ANY_SCHEMA_SELECTOR || patcher.selector === schema.kind;
        }

        if (Array.isArray(patcher.selector)) {
          return patcher.selector.includes(schema.kind);
        }

        const schemaConfig = this.schemaMap.get(schema.kind)!;

        return patcher.selector & schemaConfig.type;
      })
      .reduce((patchedSchema, patcher) => {
        return patcher.patch(patchedSchema) as T;
      }, schema);
  }

  /**
   * 过滤出第一层的控件/控件容器图示
   * @param schemas
   */
  filterControlSchemas(schemas: AnySchema[]) {
    return schemas.reduce((schemas, schema) => {
      if (this.isControlWrapperSchema(schema) || this.isComponentContainerSchema(schema)) {
        schemas = schemas.concat(this.filterControlSchemas(schema.schemas));
      } else if (this.isControlContainerSchema(schema) || this.isControlSchema(schema)) {
        schemas.push(schema);
      }

      return schemas;
    }, [] as (AnyControlSchema | AnyControlContainerSchema)[]);
  }

  isControlContainerSchema(schema: SchemaLike): schema is AnyControlContainerSchema {
    return this.typeOf(schema) === SchemaType.ControlContainer;
  }

  isControlWrapperSchema(schema: SchemaLike): schema is AnyControlWrapperSchema {
    return this.typeOf(schema) === SchemaType.ControlWrapper;
  }

  isControlSchema(schema: SchemaLike): schema is AnyControlSchema {
    return this.typeOf(schema) === SchemaType.Control;
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

  /**
   * 非控件图示，表示其本身或其子节点不会包含控件图示
   * @param schema
   */
  isNonControlSchema(schema: SchemaLike): schema is AnyComponentSchema | AnyComponentWrapperSchema {
    return this.isComponentSchema(schema) || this.isComponentWrapperSchema(schema);
  }

  typeOf(schema: SchemaLike) {
    return this.schemaMap.get(schema.kind)?.type;
  }

  validatorsOf(schema: AnyControlSchema) {
    const validators: ValidatorFn[] = this.schemaMap.get(schema.kind)?.validators?.(schema) ?? [];

    // TODO required 可能是个函数，需要动态
    if (schema.required === true) {
      validators.push(Validators.required);
    }

    return validators;
  }

  find(schema: AnyContainerSchema, key: SchemaKey): AnySchema | null;
  find(schema: AnyContainerSchema, key: AnySchemaKey[]): AnySchema | null;
  find(schema: AnyContainerSchema, path: SchemaKey | AnySchemaKey[]): AnySchema | null;
  find(schema: AnyContainerSchema, path: SchemaKey | AnySchemaKey[]): AnySchema | null {
    const paths = Array.isArray(path)
      ? path.map(o => Array.isArray(o) ? o.toString() : o)
      : path.toString().split('.');

    let _schema: AnySchema | null = schema;

    for (const path of paths) {
      _schema = (_schema as AnyContainerSchema).schemas.find(o => o.key!.toString() === path) ?? null;

      if (_schema === null) {
        return _schema;
      }
    }

    return _schema;
  }
}

/**
 * 是否为双字段图示
 * @param schema
 */
export function isDoubleKeyControlSchema(schema: SchemaLike): schema is DoubleKeyControlSchema {
  return Array.isArray(schema.key);
}
