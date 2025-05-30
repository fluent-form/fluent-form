import { Pipe, type PipeTransform } from '@angular/core';
import { type AbstractSchema, SchemaKind } from '../schemas';

@Pipe({
  name: 'renderable',
  standalone: true
})
export class RenderablePipe implements PipeTransform {

  transform(schema: AbstractSchema): boolean {
    return schema.kind !== SchemaKind.Headless;
  }

}
