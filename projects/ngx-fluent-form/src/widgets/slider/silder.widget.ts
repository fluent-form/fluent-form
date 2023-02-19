import { NgClass, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { FluentBinderDirective, FluentWithContextGuardDirective } from '../../directives';
import { SliderControlSchema } from '../../schemas';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type SilderWidgetTemplateContext = WidgetTemplateContext<SliderControlSchema, FormControl<number>>;

@Component({
  standalone: true,
  imports: [
    NgClass,
    NgStyle,
    ReactiveFormsModule,
    NzSliderModule,
    FluentBinderDirective,
    FluentWithContextGuardDirective,
  ],
  templateUrl: './silder.widget.html',
})
export class SilderWidget extends AbstractWidget<SilderWidgetTemplateContext> { }
