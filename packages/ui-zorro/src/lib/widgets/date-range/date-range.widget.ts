import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AbstractWidget, FluentBindingDirective, FluentColumnPipe, FluentContextGuardDirective, FluentControlWrapperDirective, FluentGridModule, FluentInjectDirective, FluentReactivePipe, FluentTemplatePipe, WidgetTemplateContext } from '@fluent-form/core';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { DateRangePickerControlSchema } from '../../schemas';

type DateRangeWidgetTemplateContext = WidgetTemplateContext<DateRangePickerControlSchema, FormControl<[Date, Date]>>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzDatePickerModule,
    FluentGridModule,
    FluentInjectDirective,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentReactivePipe,
    FluentColumnPipe,
    FluentTemplatePipe
  ],
  templateUrl: './date-range.widget.html',
  styles: [`nz-range-picker { width: 100% }`]
})
export class DateRangeWidget extends AbstractWidget<DateRangeWidgetTemplateContext> {
  protected readonly ControlWrapperDirective = FluentControlWrapperDirective;
}
