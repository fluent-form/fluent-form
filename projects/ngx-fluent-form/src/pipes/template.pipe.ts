import { inject, Pipe, PipeTransform, TemplateRef } from '@angular/core';
import { AbstractSchema } from '../schemas';
import { AnySchemaName } from '../schemas/types';
import { TemplateRegistry } from '../services';

@Pipe({
  name: 'template',
  standalone: true
})
export class FluentTemplatePipe implements PipeTransform {
  private readonly registry = inject(TemplateRegistry);

  transform(value: AbstractSchema<AnySchemaName>): TemplateRef<unknown> {
    return this.registry.get(value.kind);
  }

}
