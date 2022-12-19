import { inject, Pipe, PipeTransform, TemplateRef } from '@angular/core';
import { SafeAny } from '@ngify/types';
import { WidgetType } from '../enumerations';
import { WidgetRepository } from '../widgets';

@Pipe({
  name: 'widgetTemplateRef',
  standalone: true
})
export class FluentWidgetTemplateRefPipe implements PipeTransform {
  private readonly repository = inject(WidgetRepository);

  transform(value: WidgetType): TemplateRef<SafeAny> {
    return this.repository.get(value);
  }

}
