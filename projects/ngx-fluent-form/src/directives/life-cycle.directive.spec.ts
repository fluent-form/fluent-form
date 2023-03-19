import { FluentLifeCycleDirective } from './life-cycle.directive';

describe('FluentLifeCycleDirective', () => {
  it('should create an instance', () => {
    const directive = new FluentLifeCycleDirective();
    directive.ngOnInit();
    directive.ngOnDestroy();
    expect(directive).toBeTruthy();
  });
});
