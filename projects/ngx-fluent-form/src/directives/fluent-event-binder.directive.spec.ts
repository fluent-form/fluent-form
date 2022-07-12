import { ElementRef } from '@angular/core';
import { FluentEventBinderDirective } from './fluent-event-binder.directive';

describe('FluentEventBinderDirective', () => {
  it('should create an instance', () => {
    const directive = new FluentEventBinderDirective(new ElementRef({} as HTMLElement));
    expect(directive).toBeTruthy();
  });
});
