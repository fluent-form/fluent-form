import { Pipe, type PipeTransform } from '@angular/core';
import type { AbstractSchema, ClassType, ElementType } from '../schemas';
import { isElementConfig } from './shared';

@Pipe({
  name: 'class'
})
export class ClassPipe implements PipeTransform {
  transform(value: AbstractSchema['class'], type: ElementType = 'host'): ClassType {
    const normalizedValue = isElementConfig(value) ? value : { host: value };
    return normalizedValue[type];
  }
}
