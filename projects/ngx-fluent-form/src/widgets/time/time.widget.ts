import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NzFormNoStatusService } from 'ng-zorro-antd/core/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { FluentBindingDirective, FluentContextGuardDirective, FluentInjectDirective } from '../../directives';
import { FluentColumnPipe, FluentReactivePipe, FluentTemplatePipe } from '../../pipes';
import { TimePickerControlSchema } from '../../schemas';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type TimeWidgetTemplateContext = WidgetTemplateContext<TimePickerControlSchema, FormControl<Date>>;

@Component({
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    NgStyle,
    ReactiveFormsModule,
    NzGridModule,
    NzTimePickerModule,
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
  protected readonly NzFormNoStatusService = NzFormNoStatusService;
}
