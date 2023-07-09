import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'invoke',
  standalone: true
})
export class InvokePipe implements PipeTransform {

  transform<A extends unknown[], R>(value: (...args: A) => R, ...args: A): R {
    return value(...args);
  }

}
