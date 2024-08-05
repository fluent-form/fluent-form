import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FluentBindingDirective, FluentContextGuardDirective, FluentGridModule } from '../../../directives';
import { FluentColumnPipe, FluentReactivePipe } from '../../../pipes';
import { AbstractWidget, WidgetTemplateContext } from '../../../widgets/widget';
import { ButtonComponentSchema } from '../../schemas';

type ButtonWidgetTemplateContext = WidgetTemplateContext<ButtonComponentSchema, FormGroup>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    NgStyle,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentReactivePipe,
    FluentGridModule,
    FluentColumnPipe,
  ],
  templateUrl: './button.widget.html',
})
export class ButtonWidget extends AbstractWidget<ButtonWidgetTemplateContext> { }
