import { NgClass, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { FluentBinderDirective, FluentComposableDirective, FluentContextGuardDirective } from '../../directives';
import { FluentCallPipe, FluentColumnPipe } from '../../pipes';
import { TimePickerControlSchema } from '../../schemas';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type TimeWidgetTemplateContext = WidgetTemplateContext<TimePickerControlSchema, FormControl<Date>>;

@Component({
  standalone: true,
  imports: [
    NgClass,
    NgStyle,
    ReactiveFormsModule,
    NzGridModule,
    NzTimePickerModule,
    FluentBinderDirective,
    FluentContextGuardDirective,
    FluentComposableDirective,
    FluentCallPipe,
    FluentColumnPipe
  ],
  templateUrl: './time.widget.html',
  styles: [`nz-time-picker { width: 100% }`]
})
export class TimeWidget extends AbstractWidget<TimeWidgetTemplateContext> { }
