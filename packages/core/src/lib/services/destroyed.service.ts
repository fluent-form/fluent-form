import { DestroyRef, inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DestroyedSubject extends Subject<void> {
  constructor() {
    super();

    inject(DestroyRef).onDestroy(() => {
      this.next();
      this.complete();
    });
  }
}
