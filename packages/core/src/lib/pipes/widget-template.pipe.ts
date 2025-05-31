import { inject, Pipe, type PipeTransform, TemplateRef } from '@angular/core';
import { throwCustomTemplateNotFoundError } from '../errors';
import type { AbstractSchema } from '../schemas';
import { SchemaKind } from '../schemas/interfaces';
import { WidgetTemplateRegistry } from '../services';
import { NAMED_TEMPLATES } from '../tokens';
import type { Indexable } from '../types';

/**
 * @internal
 */
@Pipe({
  name: 'widgetTemplate',
  standalone: true
})
export class FluentWidgetTemplatePipe implements PipeTransform {
  private readonly registry = inject(WidgetTemplateRegistry);
  private readonly templates = inject(NAMED_TEMPLATES, { optional: true });

  transform(value: Indexable<AbstractSchema>): TemplateRef<unknown> {
    switch (value.kind) {
      case SchemaKind.Template: {
        const dir = this.templates?.find(o => o.name === value.key);

        if (typeof ngDevMode !== 'undefined' && ngDevMode && !dir) {
          throwCustomTemplateNotFoundError(value.key as string);
        }

        return dir!.templateRef;
      }

      case SchemaKind.Headed: {
        const dir = this.templates?.find(o => o.name === value['template']);

        if (typeof ngDevMode !== 'undefined' && ngDevMode && !dir) {
          throwCustomTemplateNotFoundError(value['template']);
        }

        return dir!.templateRef;
      }

      default:
        return this.registry.get(value.kind);
    }

  }

}
