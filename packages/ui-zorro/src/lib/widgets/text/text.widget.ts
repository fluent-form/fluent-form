import { NgClass, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AbstractWidget, FluentBindingDirective, FluentContextGuardDirective, FluentTemplatePipe, WidgetTemplateContext } from '@fluent-form/core';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzFormModule } from 'ng-zorro-antd/form';
import { TextComponentSchema } from '../../schemas';

type TextWidgetTemplateContext = WidgetTemplateContext<TextComponentSchema, FormGroup>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    NgClass,
    NgStyle,
    ReactiveFormsModule,
    NzFormModule,
    NzOutletModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentTemplatePipe
  ],
  templateUrl: './text.widget.html',
})
export class TextWidget extends AbstractWidget<TextWidgetTemplateContext> { }
