import { TestBed } from '@angular/core/testing';
import { FluentControlWrapperDirective } from './control-wrapper.directive';

describe('FluentControlWrapperDirective', () => {
  it('should create an instance', () => {
    const directive = TestBed.runInInjectionContext(() => new FluentControlWrapperDirective());
    expect(directive).toBeTruthy();
  });
});
