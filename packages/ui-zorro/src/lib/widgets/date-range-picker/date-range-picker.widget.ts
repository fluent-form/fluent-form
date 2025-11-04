import { ChangeDetectionStrategy, Component } from '@angular/core';
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
import { StatusPipe } from '../../pipes';
import { DateRangePickerControlSchema } from '../../schemas';

type DateRangePickerWidgetTemplateContext = WidgetTemplateContext<DateRangePickerControlSchema, FormControl<[Date, Date]>>;

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
    FluentInjectPipe,
    StatusPipe
  ],
  templateUrl: './date-range-picker.widget.html',
  styles: `nz-range-picker { width: 100% }`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateRangePickerWidget extends AbstractWidget<DateRangePickerWidgetTemplateContext> {
  protected readonly ControlWrapperDirective = FluentControlWrapperDirective;
}
