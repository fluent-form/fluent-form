import { Pipe, PipeTransform } from '@angular/core';

type Typeof = 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'function';

@Pipe({
  name: 'typeof'
})
export class FluentTypeofPipe implements PipeTransform {

  transform(value: unknown): Typeof;
  transform<T extends Typeof>(value: unknown, type: T): value is T;
  transform(value: unknown, type?: Typeof) {
    const typeName = typeof value;
    return type ? typeName === type : typeName;
  }

}
