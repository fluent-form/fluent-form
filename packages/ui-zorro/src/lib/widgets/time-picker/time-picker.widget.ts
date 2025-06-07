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
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { TimePickerControlSchema } from '../../schemas';

type TimePickerWidgetTemplateContext = WidgetTemplateContext<TimePickerControlSchema, FormControl<Date>>;

/**
 * @internal
 */
@Component({
  imports: [
    ReactiveFormsModule,
    NzTimePickerModule,
    FluentGridModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentReactivePipe,
    FluentColumnPipe,
    FluentTemplatePipe,
    FluentInjectPipe
  ],
  templateUrl: './time-picker.widget.html',
  styles: [`nz-time-picker { width: 100% }`]
})
export class TimePickerWidget extends AbstractWidget<TimePickerWidgetTemplateContext> {
  protected readonly ControlWrapperDirective = FluentControlWrapperDirective;
}
