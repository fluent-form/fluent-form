import { Pipe, type PipeTransform } from '@angular/core';
import type { AbstractSchema, ElementType, StyleType } from '../schemas';
import { isElementConfig } from './shared';

@Pipe({
  name: 'style'
})
export class StylePipe implements PipeTransform {
  transform(value: AbstractSchema['style'], type: ElementType = 'host'): StyleType {
    const normalizedValue = isElementConfig(value) ? value : { host: value };
    return normalizedValue[type];
  }
}
