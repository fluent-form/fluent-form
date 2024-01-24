import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NzFormNoStatusService } from 'ng-zorro-antd/core/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FluentGridModule } from '../../components';
import { FluentBindingDirective, FluentContextGuardDirective, FluentInjectDirective } from '../../directives';
import { FluentColumnPipe, FluentReactivePipe, FluentTemplatePipe } from '../../pipes';
import { DatePickerControlSchema } from '../../schemas';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type DateWidgetTemplateContext = WidgetTemplateContext<DatePickerControlSchema, FormControl<Date>>;

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
  templateUrl: './date.widget.html',
  styles: [`nz-date-picker { width: 100% }`]
})
export class DateWidget extends AbstractWidget<DateWidgetTemplateContext> {
  protected readonly InputGroup = NzFormNoStatusService;
}
