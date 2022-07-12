import { ElementRef } from '@angular/core';
import { FluentPropertyBinderDirective } from './fluent-property-binder.directive';

describe('FluentPropertyBinderDirective', () => {
  it('should create an instance', () => {
    const directive = new FluentPropertyBinderDirective(new ElementRef({} as HTMLElement));
    expect(directive).toBeTruthy();
  });
});
