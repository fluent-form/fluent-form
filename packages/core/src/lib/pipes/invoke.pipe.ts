import { Pipe, type PipeTransform } from '@angular/core';

/**
 * @internal
 */
@Pipe({
  name: 'invoke',
  standalone: true
})
export class InvokePipe implements PipeTransform {
  transform<A extends unknown[], R>(value: (...args: A) => R, ...args: A): R {
    return value(...args);
  }
}
