import { inject, Pipe, PipeTransform, TemplateRef } from '@angular/core';
import { SafeAny } from '@ngify/types';
import { TEMPLATE_DIRECTIVE_CONTAINER } from '../tokens';
import { isString } from '../utils';

@Pipe({
  name: 'template',
  standalone: true
})
export class FluentTemplatePipe implements PipeTransform {
  private readonly container = inject(TEMPLATE_DIRECTIVE_CONTAINER, { optional: true });

  transform(value?: string | TemplateRef<SafeAny>): string | TemplateRef<SafeAny> | undefined {
    if (isString(value) && value.startsWith('#')) {
      const name = value.slice(1); // remove the '#'
      const dir = this.container?.templateDirectives?.find(o => o.name === name);

      if (dir) {
        return dir.templateRef;
      }
    }

    return value;
  }

}
