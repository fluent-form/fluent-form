import { NgClass, NgIf, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FluentBindingDirective, FluentContextGuardDirective, FluentGridModule, FluentInjectDirective } from '../../../directives';
import { FluentColumnPipe, FluentReactivePipe, FluentTemplatePipe, InvokePipe } from '../../../pipes';
import { AbstractWidget, WidgetTemplateContext } from '../../../widgets/widget';
import { ButtonComponentSchema } from '../../schemas';

type ButtonWidgetTemplateContext = WidgetTemplateContext<ButtonComponentSchema, FormGroup>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    NgStyle,
    NgTemplateOutlet,
    FluentInjectDirective,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentReactivePipe,
    FluentTemplatePipe,
    FluentGridModule,
    FluentColumnPipe,
    InvokePipe,
  ],
  templateUrl: './button.widget.html',
})
export class ButtonWidget extends AbstractWidget<ButtonWidgetTemplateContext> { }
