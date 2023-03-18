import { inject, Pipe, PipeTransform, TemplateRef } from '@angular/core';
import { WidgetKind } from '../widgets/kind';
import { WidgetRegistry } from '../widgets/widget-registry.service';

@Pipe({
  name: 'template',
  standalone: true
})
export class FluentTemplatePipe implements PipeTransform {
  private readonly registry = inject(WidgetRegistry);

  transform(value: string): TemplateRef<unknown> {
    return this.registry.get(value as WidgetKind);
  }

}
