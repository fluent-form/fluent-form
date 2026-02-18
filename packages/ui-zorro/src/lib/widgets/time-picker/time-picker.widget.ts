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
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { StatusPipe } from '../../pipes';
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
    FluentInjectPipe,
    StatusPipe,
    ClassPipe,
    StylePipe
  ],
  templateUrl: './time-picker.widget.html',
  styles: `nz-time-picker { width: 100% }`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class TimePickerWidget extends AbstractWidget<TimePickerWidgetTemplateContext> {
  protected readonly ControlWrapperDirective = FluentControlWrapperDirective;
}
