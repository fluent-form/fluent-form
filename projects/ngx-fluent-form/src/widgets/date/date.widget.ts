import { NgClass, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FluentBinderDirective, FluentComposableDirective, FluentWithContextGuardDirective } from '../../directives';
import { FluentCallPipe, FluentColumnPipe, FluentTypeofPipe } from '../../pipes';
import { DatePickerControlSchema } from '../../schemas';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type DateWidgetTemplateContext = WidgetTemplateContext<DatePickerControlSchema, FormControl<Date>>;

@Component({
  standalone: true,
  imports: [
    NgClass,
    NgStyle,
    ReactiveFormsModule,
    NzGridModule,
    NzDatePickerModule,
    FluentBinderDirective,
    FluentWithContextGuardDirective,
    FluentComposableDirective,
    FluentTypeofPipe,
    FluentCallPipe,
    FluentColumnPipe
  ],
  templateUrl: './date.widget.html',
  styles: [`nz-date-picker { width: 100% }`]
})
export class DateWidget extends AbstractWidget<DateWidgetTemplateContext> { }
