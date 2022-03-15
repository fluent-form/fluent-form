import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Injectable()
@Pipe({ name: 'control' })
export class FluentFormControlNamePipe implements PipeTransform {

  transform(value: string | [string, string]): string {
    return Array.isArray(value) ? value.join('-') : value;
  }

}
