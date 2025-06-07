import { inject, type InjectOptions, Injector, Pipe, type PipeTransform, type ProviderToken } from '@angular/core';

/**
 * @internal
 */
@Pipe({
  name: 'inject'
})
export class FluentInjectPipe implements PipeTransform {
  private readonly injector = inject(Injector);

  transform<T>(value: ProviderToken<T>, options?: InjectOptions): T | null {
    return this.injector.get(value, null, options);
  }
}
