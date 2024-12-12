import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AbstractWidget, FluentBindingDirective, FluentColumnPipe, FluentContextGuardDirective, FluentControlWrapperDirective, FluentGridModule, FluentInjectPipe, FluentReactivePipe, FluentTemplatePipe, WidgetTemplateContext } from '@fluent-form/core';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { TimePickerControlSchema } from '../../schemas';
import { NzSpaceCompactItemDirective } from '../space-compact/lib/space-compact-item.directive';

type TimeWidgetTemplateContext = WidgetTemplateContext<TimePickerControlSchema, FormControl<Date>>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzTimePickerModule,
    NzSpaceCompactItemDirective,
    FluentGridModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentReactivePipe,
    FluentColumnPipe,
    FluentTemplatePipe,
    FluentInjectPipe,
  ],
  templateUrl: './time.widget.html',
  styles: [`nz-time-picker { width: 100% }`]
})
export class TimeWidget extends AbstractWidget<TimeWidgetTemplateContext> {
  protected readonly ControlWrapperDirective = FluentControlWrapperDirective;
}
