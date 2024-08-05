import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AbstractWidget, FluentBindingDirective, FluentColumnPipe, FluentContextGuardDirective, FluentGridModule, FluentInjectDirective, FluentReactivePipe, FluentTemplatePipe, WidgetTemplateContext } from '@fluent-form/core';
import { NzFormNoStatusService } from 'ng-zorro-antd/core/form';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { TimePickerControlSchema } from '../../schemas';

type TimeWidgetTemplateContext = WidgetTemplateContext<TimePickerControlSchema, FormControl<Date>>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzTimePickerModule,
    FluentGridModule,
    FluentInjectDirective,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentReactivePipe,
    FluentColumnPipe,
    FluentTemplatePipe
  ],
  templateUrl: './time.widget.html',
  styles: [`nz-time-picker { width: 100% }`]
})
export class TimeWidget extends AbstractWidget<TimeWidgetTemplateContext> {
  protected readonly InputGroup = NzFormNoStatusService;
}
