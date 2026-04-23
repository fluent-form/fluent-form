import { Pipe, type PipeTransform } from '@angular/core';
import type { AbstractSchema, ClassType, ElementType, WithoutSchemaReactiveFn } from '../schemas';
import { isElementConfig } from './shared';

@Pipe({
  name: 'class'
})
export class ClassPipe implements PipeTransform {
  transform(value: WithoutSchemaReactiveFn<AbstractSchema['class']>, type: ElementType = 'host'): ClassType {
    const normalizedValue = isElementConfig(value) ? value : { host: value };
    return normalizedValue[type];
  }
}
