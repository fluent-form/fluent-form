import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  AbstractWidget,
  ClassPipe,
  FluentBindingDirective,
  FluentColumnPipe,
  FluentContextGuardDirective,
  FluentControlWrapperDirective,
  FluentGridModule,
  FluentInjectPipe,
  FluentReactivePipe,
  FluentTemplatePipe,
  StylePipe,
  WidgetTemplateContext
} from '@fluent-form/core';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { StatusPipe } from '../../pipes';
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
    FluentInjectPipe,
    StatusPipe,
    ClassPipe,
    StylePipe
  ],
  templateUrl: './date-picker.widget.html',
  styles: `nz-date-picker { width: 100% }`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class DatePickerWidget extends AbstractWidget<DatePickerWidgetTemplateContext> {
  protected readonly ControlWrapperDirective = FluentControlWrapperDirective;
}
