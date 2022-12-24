import { FluentWithContextGuardDirective } from './with-context-guard.directive';

describe('FluentWithContextGuardDirective', () => {
  it('create an instance', () => {
    const directive = new FluentWithContextGuardDirective();
    FluentWithContextGuardDirective.ngTemplateContextGuard(
      directive,
      null
    );

    expect(directive).toBeTruthy();
  });
});
