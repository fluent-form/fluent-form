import { FluentContextGuardDirective } from './context-guard.directive';

describe('FluentWithContextGuardDirective', () => {
  it('create an instance', () => {
    const directive = new FluentContextGuardDirective();
    FluentContextGuardDirective.ngTemplateContextGuard(
      directive,
      null
    );

    expect(directive).toBeTruthy();
  });
});
