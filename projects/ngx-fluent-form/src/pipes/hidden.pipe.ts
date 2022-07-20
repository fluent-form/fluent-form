import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hidden'
})
export class HiddenPipe implements PipeTransform {

  transform(value: boolean | ((model: unknown) => boolean), model: unknown): boolean {
    if (typeof value === 'function') {
      return value(model);
    }

    return value;
  }

}
