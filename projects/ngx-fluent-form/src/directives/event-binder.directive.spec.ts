import { ElementRef } from '@angular/core';
import { Destroyer } from '../services/destroyer.service';
import { EventBinderDirective } from './event-binder.directive';

describe('EventBinderDirective', () => {
  it('should create an instance', () => {
    const directive = new EventBinderDirective(
      new ElementRef({} as HTMLElement),
      new Destroyer()
    );
    expect(directive).toBeTruthy();
  });
});
