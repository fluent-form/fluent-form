import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AbstractWidget, FluentBindingDirective, FluentColumnPipe, FluentContextGuardDirective, FluentGridModule, FluentInjectDirective, FluentReactivePipe, FluentTemplatePipe, WidgetTemplateContext } from '@fluent-form/core';
import { NzFormNoStatusService } from 'ng-zorro-antd/core/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { DateRangePickerControlSchema } from '../../schemas';

type DateRangeWidgetTemplateContext = WidgetTemplateContext<DateRangePickerControlSchema, FormControl<[Date, Date]>>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    NgStyle,
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
  protected readonly InputGroup = NzFormNoStatusService;
}
