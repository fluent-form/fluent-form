import { Pipe, type PipeTransform } from '@angular/core';
import type { AbstractSchema, Column } from '../schemas';
import { isObject } from '../utils';

function isColumn(value: object): value is Column {
  return 'span' in value || 'flex' in value || 'offset' in value;
}

/**
 * @internal
 */
@Pipe({
  name: 'col',
  standalone: true
})
export class FluentColumnPipe implements PipeTransform {
  transform<T extends keyof Column>(value: AbstractSchema['col'], type: T): Column[T] {
    if (!value) {
      return null;
    }

    if (isObject(value) && isColumn(value)) {
      return value[type] ?? null;
    }

    return type === 'span' ? (value as Column[T]) : null;
  }
}
