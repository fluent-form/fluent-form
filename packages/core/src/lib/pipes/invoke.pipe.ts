import { Pipe, type PipeTransform } from '@angular/core';

/**
 * @internal
 */
@Pipe({
  name: 'invoke'
})
export class InvokePipe implements PipeTransform {
  transform<A extends unknown[], R>(value: (...args: A) => R, ...args: A): R {
    return value(...args);
  }
}
