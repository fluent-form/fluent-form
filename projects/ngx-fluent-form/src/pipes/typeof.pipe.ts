import { Pipe, PipeTransform } from '@angular/core';

type Typeof = 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'function';

@Pipe({
  name: 'typeof'
})
export class TypeofPipe implements PipeTransform {

  transform(value: unknown): Typeof;
  transform(value: unknown, type: Typeof): boolean;
  transform(value: unknown, type?: Typeof) {
    const typeName = typeof value;

    return type ? typeName === type : typeName;
  }

}
