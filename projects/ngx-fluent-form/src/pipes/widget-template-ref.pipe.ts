import { inject, Pipe, PipeTransform, TemplateRef } from '@angular/core';
import { WidgetKind } from '../enumerations';
import { WidgetRepository } from '../widgets/widget-repository.service';

@Pipe({
  name: 'widgetTemplateRef',
  standalone: true
})
export class FluentWidgetTemplateRefPipe implements PipeTransform {
  private readonly repository = inject(WidgetRepository);

  transform(value: WidgetKind): TemplateRef<unknown> {
    return this.repository.get(value);
  }

}
