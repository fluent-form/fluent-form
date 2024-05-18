import { inject, Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import { AbstractSchema, MaybeSchemaReactiveFn } from '../schemas';
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
    // 因为有可能是静态表达式，所以无法确定最终类型
    return this.transformer.transform(value, { model, schema, control });
  }

}
