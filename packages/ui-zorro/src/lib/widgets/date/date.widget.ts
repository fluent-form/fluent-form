import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  AbstractWidget,
  FluentBindingDirective,
  FluentColumnPipe,
  FluentContextGuardDirective,
  FluentControlWrapperDirective,
  FluentGridModule,
  FluentInjectPipe,
  FluentReactivePipe,
  FluentTemplatePipe,
  WidgetTemplateContext
} from '@fluent-form/core';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { DatePickerControlSchema } from '../../schemas';
import { NzSpaceCompactItemDirective } from '../space-compact/lib/space-compact-item.directive';

type DateWidgetTemplateContext = WidgetTemplateContext<DatePickerControlSchema, FormControl<Date>>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzDatePickerModule,
    NzSpaceCompactItemDirective,
    FluentGridModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentReactivePipe,
    FluentColumnPipe,
    FluentTemplatePipe,
    FluentInjectPipe
  ],
  templateUrl: './date.widget.html',
  styles: [`nz-date-picker { width: 100% }`]
})
export class DateWidget extends AbstractWidget<DateWidgetTemplateContext> {
  protected readonly ControlWrapperDirective = FluentControlWrapperDirective;
}
