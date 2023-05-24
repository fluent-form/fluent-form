import { Pipe, PipeTransform } from '@angular/core';
import { AnyControlSchema, AnySchema, FormArraySchema, FormGroupSchema } from '../schemas';
import { AnySchemaName } from '../schemas/types';
import { schemasUtils } from '../utils';

@Pipe({
  name: 'schema',
  standalone: true
})
export class FluentSchemaPipe implements PipeTransform {

  /**
   * 将 value 作为 key，获取 schemas 中的图示
   * @param value
   * @param schemas
   * @param type 用来重载方法的返回值
   */
  transform(value: AnySchemaName, schemas: AnySchema[], type: 'control'): AnyControlSchema | null;
  transform(value: AnySchemaName, schemas: AnySchema[], type: 'group'): FormGroupSchema | null;
  transform(value: AnySchemaName, schemas: AnySchema[], type: 'array'): FormArraySchema | null;
  transform(value: AnySchemaName, schemas: AnySchema[]): AnySchema | null;
  transform(value: AnySchemaName, schemas: AnySchema[]): AnySchema | null {
    return schemasUtils(schemas).find(value);
  }

}
