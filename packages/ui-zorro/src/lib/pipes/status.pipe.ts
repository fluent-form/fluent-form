import { inject, Injector, Pipe, PipeTransform, Signal, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';
import { NzStatus } from 'ng-zorro-antd/core/types';
import { map, startWith } from 'rxjs';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {
  private readonly injector = inject(Injector);

  transform(value: AbstractControl): Signal<NzStatus> {
    return untracked(() => toSignal(
      value.statusChanges.pipe(
        startWith(value.status),
        map(() => {
          if ((value.touched || value.dirty) && !value.pending) {
            if (value.hasError('warning')) {
              return 'warning';
            }
            if (value.invalid) {
              return 'error';
            }
          }
          return '';
        })
      ),
      { initialValue: '', injector: this.injector }
    ));
  }
}
