import { NgClass, NgStyle } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FluentBinderDirective, FluentComposableDirective, FluentWithContextGuardDirective } from '../../directives';
import { FluentCallPipe, FluentTypeofPipe } from '../../pipes';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type DateWidgetTemplateContext = WidgetTemplateContext<any>;

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
    FluentCallPipe
  ],
  templateUrl: './date.widget.html',
  styles: [`nz-date-picker { width: 100% }`]
})
export class DateWidget extends AbstractWidget<DateWidgetTemplateContext> {
  @ViewChild(TemplateRef, { static: true }) templateRef!: TemplateRef<DateWidgetTemplateContext>;
}
