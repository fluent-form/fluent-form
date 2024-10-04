import { TestBed } from '@angular/core/testing';
import { FluentLifeCycleDirective } from './life-cycle.directive';

describe('FluentLifeCycleDirective', () => {
  it('should create an instance', () => {
    const directive = TestBed.runInInjectionContext(() => new FluentLifeCycleDirective());

    directive.ngOnInit();
    directive.ngOnDestroy();
    expect(directive).toBeTruthy();
  });
});
