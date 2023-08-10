import { inject, Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import { AbstractSchema, SchemaReactiveFn } from '../schemas';
import { ValueTransformer } from '../services';

@Pipe({
  name: 'reactive',
  standalone: true
})
export class FluentReactivePipe implements PipeTransform {
  private readonly transformer = inject(ValueTransformer);

  transform<T>(
    value: string | T | SchemaReactiveFn<SafeAny, T>,
    model: unknown,
    schema: AbstractSchema,
    control: AbstractControl
  ): T | SafeAny {
    return this.transformer.transform(value, { model, schema, control });
  }

}
