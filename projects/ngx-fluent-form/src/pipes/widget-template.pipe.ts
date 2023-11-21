import { inject, Pipe, PipeTransform, TemplateRef } from '@angular/core';
import { throwCustomTemplateNotFoundError } from '../errors';
import { AnySchema } from '../schemas';
import { SchemaKind } from '../schemas/interfaces';
import { WidgetTemplateRegistry } from '../services';
import { TEMPLATE_DIRECTIVE_CONTAINER } from '../tokens';

/**
 * @internal
 */
@Pipe({
  name: 'widgetTemplate',
  standalone: true
})
export class FluentWidgetTemplatePipe implements PipeTransform {
  private readonly registry = inject(WidgetTemplateRegistry);
  private readonly directiveContainer = inject(TEMPLATE_DIRECTIVE_CONTAINER, { optional: true });

  transform(value: AnySchema): TemplateRef<unknown> {
    const templateDirectives = this.directiveContainer?.templateDirectives;

    switch (value.kind) {
      case SchemaKind.Template: {
        const dir = templateDirectives?.find(o => o.name === value.key);

        if (!dir) {
          throwCustomTemplateNotFoundError(value.key!);
        }

        return dir.templateRef;
      }

      case SchemaKind.Headless: {
        // 这里假设在外层已经判断 value.template 是否存在了
        const dir = templateDirectives?.find(o => o.name === value.template);

        if (!dir) {
          throwCustomTemplateNotFoundError(value.template!);
        }

        return dir.templateRef;
      }

      default:
        return this.registry.get(value.kind);
    }

  }

}
