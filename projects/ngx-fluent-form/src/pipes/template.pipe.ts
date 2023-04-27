import { inject, Pipe, PipeTransform, TemplateRef } from '@angular/core';
import { CONTROL_CONTAINER_SCHEMA_KINDS } from '../constants';
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
    const kind = CONTROL_CONTAINER_SCHEMA_KINDS.includes(value.kind) ? 'nested-form' : value.kind;
    return this.registry.get(kind);
  }

}
