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

type DatePickerWidgetTemplateContext = WidgetTemplateContext<DatePickerControlSchema, FormControl<Date>>;

/**
 * @internal
 */
@Component({
  imports: [
    ReactiveFormsModule,
    NzDatePickerModule,
    FluentGridModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentReactivePipe,
    FluentColumnPipe,
    FluentTemplatePipe,
    FluentInjectPipe
  ],
  templateUrl: './date-picker.widget.html',
  styles: [`nz-date-picker { width: 100% }`]
})
export class DatePickerWidget extends AbstractWidget<DatePickerWidgetTemplateContext> {
  protected readonly ControlWrapperDirective = FluentControlWrapperDirective;
}
