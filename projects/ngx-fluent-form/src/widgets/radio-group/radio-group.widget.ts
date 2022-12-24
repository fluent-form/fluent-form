import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FluentBinderDirective, FluentWithContextGuardDirective } from '../../directives';
import { FluentCallPipe, FluentTypeofPipe } from '../../pipes';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type RadioGroupWidgetTemplateContext = WidgetTemplateContext<any>;

@Component({
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgClass,
    NgStyle,
    ReactiveFormsModule,
    NzRadioModule,
    FluentBinderDirective,
    FluentWithContextGuardDirective,
    FluentTypeofPipe,
    FluentCallPipe
  ],
  templateUrl: './radio-group.widget.html',
})
export class RadioGroupWidget extends AbstractWidget<RadioGroupWidgetTemplateContext> {
  @ViewChild(TemplateRef, { static: true }) templateRef!: TemplateRef<RadioGroupWidgetTemplateContext>;
}
