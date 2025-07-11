import { inject, Injector, Pipe, type PipeTransform, runInInjectionContext, Type } from '@angular/core';
import type { SafeAny } from '@ngify/core';

/**
 * @internal
 */
@Pipe({
  name: 'new'
})
export class FluentNewPipe implements PipeTransform {
  private readonly injector = inject(Injector);

  transform<T>(clazz: Type<T>, ...args: SafeAny[]): T {
    return runInInjectionContext(this.injector, () => new clazz(...args));
  }
}
