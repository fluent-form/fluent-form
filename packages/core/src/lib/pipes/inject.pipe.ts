import { inject, InjectOptions, Injector, Pipe, PipeTransform, ProviderToken } from '@angular/core';

/**
 * @internal
 */
@Pipe({
  name: 'inject',
  standalone: true
})
export class FluentInjectPipe implements PipeTransform {
  private readonly injector = inject(Injector);

  transform<T>(value: ProviderToken<T>, options?: InjectOptions): T | null {
    return this.injector.get(value, null, options);
  }

}
