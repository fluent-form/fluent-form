import { inject, Injector, Pipe, type PipeTransform, runInInjectionContext, Type } from '@angular/core';
import type { SafeAny } from '@ngify/types';

/**
 * @internal
 */
@Pipe({
  name: 'new',
  standalone: true
})
export class FluentNewPipe implements PipeTransform {
  private readonly injector = inject(Injector);

  transform<T>(clazz: Type<T>, ...args: SafeAny[]): T {
    return runInInjectionContext(this.injector, () => new clazz(...args));
  }
}
