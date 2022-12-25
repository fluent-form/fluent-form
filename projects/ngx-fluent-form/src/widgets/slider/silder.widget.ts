import { NgClass, NgStyle } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { FluentBinderDirective, FluentWithContextGuardDirective } from '../../directives';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type SilderWidgetTemplateContext = WidgetTemplateContext<any>;

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
export class SilderWidget extends AbstractWidget<SilderWidgetTemplateContext> {
  @ViewChild(TemplateRef, { static: true }) templateRef!: TemplateRef<SilderWidgetTemplateContext>;
}
