import { ElementRef } from '@angular/core';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { EventBinderDirective } from './event-binder.directive';

describe('EventBinderDirective', () => {
  it('should create an instance', () => {
    const directive = new EventBinderDirective(
      new ElementRef({} as HTMLElement),
      new NzDestroyService()
    );
    expect(directive).toBeTruthy();
  });
});
