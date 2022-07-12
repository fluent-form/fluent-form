import { ElementRef } from '@angular/core';
import { PropertyBinderDirective } from './property-binder.directive';

describe('PropertyBinderDirective', () => {
  it('should create an instance', () => {
    const directive = new PropertyBinderDirective(new ElementRef({} as HTMLElement));
    expect(directive).toBeTruthy();
  });
});
