import { inject, Pipe, PipeTransform, TemplateRef } from '@angular/core';
import { WidgetKind } from '../widgets/kind';
import { WidgetRegistry } from '../widgets/widget-registry.service';

@Pipe({
  name: 'widgetTemplateRef',
  standalone: true
})
export class FluentWidgetTemplateRefPipe implements PipeTransform {
  private readonly registry = inject(WidgetRegistry);

  transform(value: WidgetKind): TemplateRef<unknown> {
    return this.registry.get(value);
  }

}
