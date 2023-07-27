import { inject, Pipe, PipeTransform } from '@angular/core';
import { SchemaType } from '../schemas/interfaces';
import { SCHEMA_MAP } from '../tokens';

@Pipe({
  name: 'schemaType',
  standalone: true
})
export class FluentSchemaTypePipe implements PipeTransform {
  private readonly schemaMap = inject(SCHEMA_MAP);

  transform(value: string): SchemaType {
    return this.schemaMap.get(value)!.type;
  }

}
