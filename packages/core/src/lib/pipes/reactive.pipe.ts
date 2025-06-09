import { inject, Pipe, type PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import type { SafeAny } from '@ngify/core';
import type { AbstractSchema, MaybeSchemaReactiveFn } from '../schemas';
import { ValueTransformer } from '../services';

/**
 * @internal
 */
@Pipe({
  name: 'reactive'
})
export class FluentReactivePipe implements PipeTransform {
  private readonly transformer = inject(ValueTransformer);

  transform<T>(
    value: MaybeSchemaReactiveFn<SafeAny, T>,
    model: unknown,
    schema: AbstractSchema,
    control: AbstractControl
  ): T {
    return this.transformer.transform(value, { model, schema, control });
  }
}
