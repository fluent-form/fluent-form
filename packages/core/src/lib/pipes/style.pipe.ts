import { Pipe, type PipeTransform } from '@angular/core';
import type { AbstractSchema, ElementType, StyleType, WithoutSchemaReactiveFn } from '../schemas';
import { isElementConfig } from './shared';

@Pipe({
  name: 'style'
})
export class StylePipe implements PipeTransform {
  transform(value: WithoutSchemaReactiveFn<AbstractSchema['style']>, type: ElementType = 'host'): StyleType {
    const normalizedValue = isElementConfig(value) ? value : { host: value };
    return normalizedValue[type];
  }
}
