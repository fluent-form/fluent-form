import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FluentBinderDirective, FluentWithContextGuardDirective } from '../../directives';
import { RadioGroupControlSchema } from '../../schemas';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type RadioGroupWidgetTemplateContext = WidgetTemplateContext<RadioGroupControlSchema, FormControl>;

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
  ],
  templateUrl: './radio-group.widget.html',
})
export class RadioGroupWidget extends AbstractWidget<RadioGroupWidgetTemplateContext> { }
