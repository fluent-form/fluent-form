import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bool'
})
export class BoolPipe implements PipeTransform {

  transform<T>(value: boolean | ((model: T) => boolean), model: T): boolean {
    if (typeof value === 'function') {
      return value(model);
    }

    return value;
  }

}
