import { inject, Pipe, PipeTransform } from '@angular/core';
import { AbstractBranchSchema, AbstractControlContainerSchema, AbstractControlSchema, SchemaKey, SingleSchemaKey } from '../schemas';
import { Indexable } from '../types';
import { SchemaUtil } from '../utils';

/**
 * @internal
 */
@Pipe({
  name: 'schema',
  standalone: true
})
export class FluentSchemaPipe implements PipeTransform {
  private readonly schemaUtil = inject(SchemaUtil);

  /**
   * Use value as a key to get the schema from schemas.
   * @param value
   * @param schemas
   * @param type Used to overload the method's return type
   */
  transform(value: SingleSchemaKey | SchemaKey[], schema: Indexable<AbstractBranchSchema>, type: 'control'): AbstractControlSchema | null;
  transform(value: SingleSchemaKey | SchemaKey[], schema: Indexable<AbstractBranchSchema>, type: 'group'): AbstractControlContainerSchema | null;
  transform(value: SingleSchemaKey | SchemaKey[], schema: Indexable<AbstractBranchSchema>, type: 'array'): AbstractControlContainerSchema | null;
  transform(value: SingleSchemaKey | SchemaKey[], schema: Indexable<AbstractBranchSchema>): AbstractControlSchema | AbstractControlContainerSchema | null;
  transform(value: SingleSchemaKey | SchemaKey[], schema: Indexable<AbstractBranchSchema>): AbstractControlSchema | AbstractControlContainerSchema | null {
    return this.schemaUtil.find(schema, value) as AbstractControlSchema | AbstractControlContainerSchema | null;
  }

}
