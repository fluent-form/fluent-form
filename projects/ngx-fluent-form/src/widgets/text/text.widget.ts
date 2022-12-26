import { NgClass, NgStyle } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FluentBinderDirective, FluentWithContextGuardDirective } from '../../directives';
import { TextComponentSchema } from '../../schemas';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type TextWidgetTemplateContext = WidgetTemplateContext<TextComponentSchema, FormGroup>;

@Component({
  standalone: true,
  imports: [
    NgClass,
    NgStyle,
    ReactiveFormsModule,
    NzFormModule,
    NzOutletModule,
    FluentBinderDirective,
    FluentWithContextGuardDirective,
  ],
  templateUrl: './text.widget.html',
})
export class TextWidget extends AbstractWidget<TextWidgetTemplateContext> {
  @ViewChild(TemplateRef, { static: true }) templateRef!: TemplateRef<TextWidgetTemplateContext>;
}
