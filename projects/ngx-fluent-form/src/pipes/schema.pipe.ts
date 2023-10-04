import { inject, Pipe, PipeTransform } from '@angular/core';
import { AnyContainerSchema, AnyControlSchema, AnySchema, AnySchemaKey, FormArraySchema, FormGroupSchema, SchemaKey } from '../schemas';
import { SchemaUtil } from '../utils';

@Pipe({
  name: 'schema',
  standalone: true
})
export class FluentSchemaPipe implements PipeTransform {
  private readonly schemaUtil = inject(SchemaUtil);

  /**
   * 将 value 作为 key，获取 schemas 中的图示
   * @param value
   * @param schemas
   * @param type 用来重载方法的返回值
   */
  transform(value: SchemaKey | AnySchemaKey[], schema: AnyContainerSchema, type: 'control'): AnyControlSchema | null;
  transform(value: SchemaKey | AnySchemaKey[], schema: AnyContainerSchema, type: 'group'): FormGroupSchema | null;
  transform(value: SchemaKey | AnySchemaKey[], schema: AnyContainerSchema, type: 'array'): FormArraySchema | null;
  transform(value: SchemaKey | AnySchemaKey[], schema: AnyContainerSchema): AnySchema | null;
  transform(value: SchemaKey | AnySchemaKey[], schema: AnyContainerSchema): AnySchema | null {
    return this.schemaUtil.find(schema, value);
  }

}
