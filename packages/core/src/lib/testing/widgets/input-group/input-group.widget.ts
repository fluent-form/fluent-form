import { NgClass, NgFor, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AbstractWidget, FluentBindingDirective, FluentContextGuardDirective, FluentControlPipe, FluentReactivePipe, FluentTemplatePipe, FluentWidgetTemplatePipe, FluentWithInjectorDirective, InvokePipe, WidgetTemplateContext } from '@fluent-form/core';
import { InputGroupComponentSchema } from '../../schemas';

type InputGroupWidgetTemplateContext = WidgetTemplateContext<InputGroupComponentSchema, FormGroup>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    NgFor,
    NgClass,
    NgStyle,
    NgTemplateOutlet,
    ReactiveFormsModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentWithInjectorDirective,
    FluentControlPipe,
    FluentWidgetTemplatePipe,
    FluentTemplatePipe,
    FluentReactivePipe,
    InvokePipe,
  ],
  templateUrl: './input-group.widget.html'
})
export class InputGroupWidget extends AbstractWidget<InputGroupWidgetTemplateContext> { }
