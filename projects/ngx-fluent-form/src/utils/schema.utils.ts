import { inject, Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { throwWidgetNotFoundError } from '../errors';
import { SCHEMA_PATCHERS } from '../patcher';
import { AbstractBranchSchema, AbstractComponentContainerSchema, AbstractComponentWrapperSchema, AbstractControlContainerSchema, AbstractControlSchema, AbstractControlWrapperSchema, AbstractSchema, SchemaKey, SingleSchemaKey } from '../schemas';
import { SchemaLike, SchemaType } from '../schemas/interfaces';
import { SCHEMA_MAP } from '../tokens';
import { Indexable } from '../types';
import { isArray, isString } from './is.utils';

const ANY_SCHEMA_SELECTOR = '*';

@Injectable({
  providedIn: 'root'
})
export class SchemaUtil {
  private readonly schemaMap = inject(SCHEMA_MAP);
  private readonly schemaPatchers = inject(SCHEMA_PATCHERS, { optional: true }) ?? [];

  patch<T extends Indexable<AbstractSchema>>(schema: T): T {
    if (
      this.isControlWrapper(schema) ||
      this.isComponentWrapper(schema) ||
      this.isControlContainer(schema) ||
      this.isComponentContainer(schema)
    ) {
      schema.schemas = schema.schemas.map(schema => this.patch(schema));
    }

    const config = this.schemaMap.get(schema.kind);

    if (!config) {
      throwWidgetNotFoundError(schema.kind);
    }

    const { type } = config;

    return this.schemaPatchers
      .filter(patcher => {
        // 将选择器转为数组统一处理
        const selector = isArray(patcher.selector) ? patcher.selector : [patcher.selector];

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
  filterControls(schemas: Indexable<AbstractSchema>[]) {
    return schemas.reduce((schemas, schema) => {
      if (this.isControlWrapper(schema) || this.isComponentContainer(schema)) {
        schemas = schemas.concat(this.filterControls(schema.schemas));
      } else if (this.isControl(schema) || this.isControlContainer(schema)) {
        schemas.push(schema);
      }

      return schemas;
    }, [] as (AbstractControlSchema | AbstractControlContainerSchema)[]);
  }

  isControlGroup(schema: SchemaLike): schema is AbstractControlContainerSchema {
    return this.typeOf(schema) === SchemaType.ControlGroup;
  }

  isControlArray(schema: SchemaLike): schema is AbstractControlContainerSchema {
    return this.typeOf(schema) === SchemaType.ControlArray;
  }

  isControlContainer(schema: SchemaLike): schema is AbstractControlContainerSchema {
    return this.isControlGroup(schema) || this.isControlArray(schema);
  }

  isControlWrapper(schema: SchemaLike): schema is AbstractControlWrapperSchema {
    return this.typeOf(schema) === SchemaType.ControlWrapper;
  }

  isControl(schema: SchemaLike): schema is AbstractControlSchema {
    return this.typeOf(schema) === SchemaType.Control;
  }

  isComponentContainer(schema: SchemaLike): schema is AbstractComponentContainerSchema {
    return this.typeOf(schema) === SchemaType.ComponentContainer;
  }

  isComponentWrapper(schema: SchemaLike): schema is AbstractComponentWrapperSchema {
    return this.typeOf(schema) === SchemaType.ComponentWrapper;
  }

  isComponent(schema: SchemaLike): schema is AbstractSchema {
    return this.typeOf(schema) === SchemaType.Component;
  }

  /**
   * 是否为多字段图示
   * @param schema
   */
  isMultiKeySchema(schema: SchemaLike) {
    return isArray(schema.key);
  }

  /**
   * 是否为路径字段图示
   * @param schema
   */
  isPathKeySchema(schema: SchemaLike) {
    return isString(schema.key) && schema.key.includes('.');
  }

  /**
   * 非控件图示，表示其本身或其子节点不会包含控件图示
   * @param schema
   */
  isNonControl(schema: SchemaLike): schema is AbstractSchema {
    return this.isComponent(schema) || this.isComponentWrapper(schema);
  }

  typeOf(schema: SchemaLike) {
    return this.schemaMap.get(schema.kind)?.type;
  }

  validatorsOf(schema: AbstractControlSchema) {
    const validators: ValidatorFn[] = this.schemaMap.get(schema.kind)?.validators?.(schema) ?? [];

    if (schema.required === true) {
      validators.push(Validators.required);
    }

    return validators;
  }

  parsePathKey(key: string) {
    return key.split('.');
  }

  find(schema: Indexable<AbstractBranchSchema>, key: SingleSchemaKey): AbstractSchema | null;
  find(schema: Indexable<AbstractBranchSchema>, key: SchemaKey[]): AbstractSchema | null;
  find(schema: Indexable<AbstractBranchSchema>, path: SingleSchemaKey | SchemaKey[]): AbstractSchema | null;
  find(schema: Indexable<AbstractBranchSchema>, path: SingleSchemaKey | SchemaKey[]): AbstractSchema | null {
    const paths = isArray(path)
      ? path.map(o => isArray(o) ? o.toString() : o)
      : path.toString().split('.');

    let _schema: Indexable<AbstractSchema> | null = schema;

    for (const path of paths) {
      _schema = _schema['schemas'].find((o: AbstractSchema) => o.key?.toString() === path) ?? null;

      if (_schema === null) {
        return _schema;
      }
    }

    return _schema;
  }
}
