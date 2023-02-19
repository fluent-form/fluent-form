import { Pipe, PipeTransform } from '@angular/core';
import { AbstractSchema } from '../schemas';
import { AnySchemaName } from '../schemas/types';
import { isNumber } from '../utils';

type Column = AbstractSchema<AnySchemaName>['col'];

@Pipe({
  name: 'col',
  standalone: true
})
export class FluentColumnPipe implements PipeTransform {

  transform(value: Column, type: 'span'): number | null;
  transform(value: Column, type: 'flex'): string | number | null;
  transform(value: Column, type: 'offset'): number | null;
  transform(value: Column, type: 'span' | 'flex' | 'offset'): string | number | null {
    switch (type) {
      case 'span':
        return isNumber(value) ? value : value?.span ?? null;
      case 'flex':
        return isNumber(value) ? null : value?.flex ?? null;
      case 'offset':
        return isNumber(value) ? null : value?.offset ?? null;
    }
  }

}
