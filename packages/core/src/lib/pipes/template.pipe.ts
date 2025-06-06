import { inject, Pipe, type PipeTransform, TemplateRef } from '@angular/core';
import type { SafeAny } from '@ngify/core';
import { NAMED_TEMPLATES } from '../tokens';
import { isString } from '../utils';

const NAMED_TEMPLATE_PREFIX = '#' as const;

/**
 * @internal
 */
@Pipe({
  name: 'template',
  standalone: true
})
export class FluentTemplatePipe implements PipeTransform {
  private readonly templates = inject(NAMED_TEMPLATES, { optional: true });

  transform<T>(value: T): T | TemplateRef<SafeAny>;
  transform<T, U>(value: T, defaultValue: U): NonNullable<T> | U | TemplateRef<SafeAny>;
  transform<T, U>(value: T, defaultValue?: U): T | U | TemplateRef<SafeAny> {
    // If the string starts with '#', try to find the externally registered
    // template and return it.
    if (isString(value) && value[0] === NAMED_TEMPLATE_PREFIX) {
      const name = value.slice(1); // remove the '#'
      const dir = this.templates?.find(o => o.name === name);

      if (dir) {
        return dir.templateRef;
      }
    }

    return value ?? defaultValue!;
  }
}
