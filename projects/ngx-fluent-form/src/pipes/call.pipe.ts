import { Injectable, Pipe, PipeTransform, inject } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import { AbstractSchema } from '../schemas';
import { AnySchemaName } from '../schemas/types';
import { ValueTransformer } from '../services';

@Pipe({
  name: 'call',
  standalone: true
})
@Injectable({
  providedIn: 'root'
})
export class FluentCallPipe implements PipeTransform {
  private readonly transformer = inject(ValueTransformer);

  transform<T extends [unknown, AbstractSchema<AnySchemaName>, AbstractControl]>(
    value: boolean | ((...args: SafeAny[]) => boolean) | string | undefined,
    ...[model, schema, control]: T
  ): boolean {
    return this.transformer.transform(value, { model, schema, control }) ?? false;
  }

}
