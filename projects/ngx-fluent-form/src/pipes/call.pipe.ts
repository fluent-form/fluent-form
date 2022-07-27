import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'call'
})
export class CallPipe implements PipeTransform {

  transform<T>(value: boolean | ((model: T) => boolean), model: T): boolean {
    if (typeof value === 'function') {
      return value(model);
    }

    return value;
  }

}
