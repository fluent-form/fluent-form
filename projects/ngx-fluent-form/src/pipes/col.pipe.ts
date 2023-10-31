import { Pipe, PipeTransform } from '@angular/core';
import { Cell } from '../schemas';
import { Col } from '../schemas/interfaces';
import { isNumber } from '../utils';

/**
 * @internal
 */
@Pipe({
  name: 'col',
  standalone: true
})
export class FluentColumnPipe implements PipeTransform {

  transform<T extends keyof Col>(value: Col | Cell | undefined, type: keyof Col): NonNullable<Col[T]> | null {
    if (isNumber(value)) {
      return type === 'span' ? value : null;
    }

    return (value?.[type] as NonNullable<Col[T]>) ?? null;
  }

}
