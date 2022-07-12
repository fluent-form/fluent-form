import { ElementRef } from '@angular/core';
import { EventBinderDirective } from './event-binder.directive';

describe('EventBinderDirective', () => {
  it('should create an instance', () => {
    const directive = new EventBinderDirective(new ElementRef({} as HTMLElement));
    expect(directive).toBeTruthy();
  });
});
