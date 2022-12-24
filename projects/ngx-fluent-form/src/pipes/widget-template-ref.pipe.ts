import { inject, Pipe, PipeTransform, TemplateRef } from '@angular/core';
import { WidgetType } from '../enumerations';
import { WidgetRepository } from '../widgets/widget-repository.service';

@Pipe({
  name: 'widgetTemplateRef',
  standalone: true
})
export class FluentWidgetTemplateRefPipe implements PipeTransform {
  private readonly repository = inject(WidgetRepository);

  transform(value: WidgetType): TemplateRef<unknown> {
    return this.repository.get(value);
  }

}
