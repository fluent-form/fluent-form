import { FluentWithContextGuardDirective } from './with-context-guard.directive';

describe('FluentWithContextGuardDirective', () => {
  it('should be create', () => {
    FluentWithContextGuardDirective.ngTemplateContextGuard(
      new FluentWithContextGuardDirective,
      null
    );
  });
});
