import { Pipe, PipeTransform } from '@angular/core';
import { AbstractHeadlessControlSchema, AbstractSchema, SchemaKind } from '../schemas';

@Pipe({
  name: 'renderable',
  standalone: true
})
export class RenderablePipe implements PipeTransform {

  transform(schema: AbstractSchema): boolean {
    return schema.kind !== SchemaKind.Headless
      || (schema.kind === SchemaKind.Headless && !!(schema as AbstractHeadlessControlSchema).template);
  }

}
