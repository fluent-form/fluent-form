import { Pipe, PipeTransform } from '@angular/core';

type Typeof = 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'function';

/**
 * @internal
 */
@Pipe({
  name: 'typeof',
  standalone: true
})
export class TypeofPipe implements PipeTransform {

  transform(value: unknown): Typeof;
  transform(value: unknown, type: Typeof): boolean;
  transform(value: unknown, type?: Typeof) {
    const result = typeof value;
    if (type) {
      return result === type;
    }
    return result;
  }

}
