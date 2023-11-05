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

  patch<T extends AnySchema>(schema: T): T {
    if ('schemas' in schema) {
      schema.schemas = schema.schemas.map(schema => this.patch(schema));
    }

    const { type } = this.schemaMap.get(schema.kind)!;

    return this.schemaPatchers
      .filter(patcher => {
        // 将选择器转为数组统一处理
        const selector = Array.isArray(patcher.selector) ? patcher.selector : [patcher.selector];

        return selector.some(kindOrType => {
          if (isString(kindOrType)) {
            return kindOrType === ANY_SCHEMA_SELECTOR || kindOrType === schema.kind;
          }

          return kindOrType === type;
        });
      })
      .reduce((patchedSchema, patcher) => {
        return patcher.patch(patchedSchema) as T;
      }, schema);
  }

  /**
   * 过滤出首层控件/控件容器图示
   * @param schemas
   */
  filterControls(schemas: AnySchema[]) {
    return schemas.reduce((schemas, schema) => {
      if (this.isControlWrapper(schema) || this.isComponentContainer(schema)) {
        schemas = schemas.concat(this.filterControls(schema.schemas));
      } else if (this.isControlContainer(schema) || this.isControl(schema)) {
        schemas.push(schema);
      }

      return schemas;
    }, [] as (AnyControlSchema | AnyControlContainerSchema)[]);
  }

  isControlContainer(schema: SchemaLike): schema is AnyControlContainerSchema {
    return this.typeOf(schema) === SchemaType.ControlContainer;
  }

  isControlWrapper(schema: SchemaLike): schema is AnyControlWrapperSchema {
    return this.typeOf(schema) === SchemaType.ControlWrapper;
  }

  isControl(schema: SchemaLike): schema is AnyControlSchema {
    return this.typeOf(schema) === SchemaType.Control;
  }

  isComponentContainer(schema: SchemaLike): schema is AnyComponentContainerSchema {
    return this.typeOf(schema) === SchemaType.ComponentContainer;
  }

  isComponentWrapper(schema: SchemaLike): schema is AnyComponentWrapperSchema {
    return this.typeOf(schema) === SchemaType.ComponentWrapper;
  }

  isComponent(schema: SchemaLike): schema is AnyComponentSchema {
    return this.typeOf(schema) === SchemaType.Component;
  }

  /**
   * 是否为双字段图示
   * @param schema
   */
  isDoubleKeyControl(schema: SchemaLike): schema is DoubleKeyControlSchema {
    return Array.isArray(schema.key);
  }

  /**
   * 非控件图示，表示其本身或其子节点不会包含控件图示
   * @param schema
   */
  isNonControl(schema: SchemaLike): schema is AnyComponentSchema | AnyComponentWrapperSchema {
    return this.isComponent(schema) || this.isComponentWrapper(schema);
  }

  typeOf(schema: SchemaLike) {
    return this.schemaMap.get(schema.kind)?.type;
  }

  validatorsOf(schema: AnyControlSchema) {
    const validators: ValidatorFn[] = this.schemaMap.get(schema.kind)?.validators?.(schema) ?? [];

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
      _schema = (_schema as AnyContainerSchema).schemas.find(o => o.key?.toString() === path) ?? null;

      if (_schema === null) {
        return _schema;
      }
    }

    return _schema;
  }
}
