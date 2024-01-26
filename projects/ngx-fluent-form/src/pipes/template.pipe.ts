import { inject, Pipe, PipeTransform, TemplateRef } from '@angular/core';
import { SafeAny } from '@ngify/types';
import { TEMPLATE_DIRECTIVES } from '../tokens';
import { isString } from '../utils';

/**
 * @internal
 */
@Pipe({
  name: 'template',
  standalone: true
})
export class FluentTemplatePipe implements PipeTransform {
  private readonly templateDirectives = inject(TEMPLATE_DIRECTIVES, { optional: true });

  transform<T>(value: T): T | TemplateRef<SafeAny>
  transform<T, U>(value: T, defaultValue: U): NonNullable<T> | U | TemplateRef<SafeAny>
  transform<T, U>(value: T, defaultValue?: U): T | U | TemplateRef<SafeAny> {
    // 如果是以 # 开头的字符串，则尝试查询外部注册的模板并返回
    if (isString(value) && value.startsWith('#')) {
      const name = value.slice(1); // remove the '#'
      const dir = this.templateDirectives?.find(o => o.name === name);

      if (dir) {
        return dir.templateRef;
      }
    }

    return value ?? defaultValue!;
  }

}
