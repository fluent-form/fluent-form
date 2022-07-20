import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hidden'
})
export class HiddenPipe implements PipeTransform {

  transform<T>(value: boolean | ((model: T) => boolean), model: T): boolean {
    if (typeof value === 'function') {
      return value(model);
    }

    return value;
  }

}
