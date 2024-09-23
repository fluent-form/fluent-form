import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AbstractWidget, FluentBindingDirective, FluentColumnPipe, FluentContextGuardDirective, FluentControlWrapperDirective, FluentGridModule, FluentInjectDirective, FluentReactivePipe, FluentTemplatePipe, WidgetTemplateContext } from '@fluent-form/core';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { DatePickerControlSchema } from '../../schemas';

type DateWidgetTemplateContext = WidgetTemplateContext<DatePickerControlSchema, FormControl<Date>>;

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
  templateUrl: './date.widget.html',
  styles: [`nz-date-picker { width: 100% }`]
})
export class DateWidget extends AbstractWidget<DateWidgetTemplateContext> {
  protected readonly ControlWrapperDirective = FluentControlWrapperDirective;
}
