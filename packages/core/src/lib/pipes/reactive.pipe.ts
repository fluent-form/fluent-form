import { inject, Pipe, type PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import type { SafeAny } from '@ngify/types';
import type { AbstractSchema, MaybeSchemaReactiveFn } from '../schemas';
import { ValueTransformer } from '../services';

/**
 * @internal
 */
@Pipe({
  name: 'reactive',
  standalone: true
})
export class FluentReactivePipe implements PipeTransform {
  private readonly transformer = inject(ValueTransformer);

  transform<T>(
    value: MaybeSchemaReactiveFn<SafeAny, T>,
    model: unknown,
    schema: AbstractSchema,
    control: AbstractControl
  ): T | SafeAny {
    // Because it might be a static expression, the final type cannot be determined.
    return this.transformer.transform(value, { model, schema, control });
  }

}
