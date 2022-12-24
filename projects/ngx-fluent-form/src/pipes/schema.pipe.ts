import { Pipe, PipeTransform } from '@angular/core';
import { AnySchema, AnySchemaName, ControlSchema, FormArraySchema, FormGroupSchema } from '../schemas';
import { schemasUtils } from '../utils';

@Pipe({
  name: 'schema',
  standalone: true
})
export class FluentSchemaPipe implements PipeTransform {

  /**
   * 将 value 作为 name，获取 schemas 中的图示
   * @param value
   * @param schemas
   * @param type 用来重载方法的返回值
   */
  transform(value: AnySchemaName, schemas: AnySchema[], type: 'control'): ControlSchema | null;
  transform(value: AnySchemaName, schemas: AnySchema[], type: 'group'): FormGroupSchema | null;
  transform(value: AnySchemaName, schemas: AnySchema[], type: 'array'): FormArraySchema | null;
  transform(value: AnySchemaName, schemas: AnySchema[]): AnySchema | null;
  transform(value: AnySchemaName, schemas: AnySchema[]): AnySchema | null {
    return schemasUtils(schemas).find(value);
  }

}
