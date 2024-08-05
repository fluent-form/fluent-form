import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AbstractWidget, FluentBindingDirective, FluentContextGuardDirective, FluentControlPipe, FluentReactivePipe, FluentTemplatePipe, FluentWidgetTemplatePipe, FluentWithInjectorDirective, InvokePipe, WidgetTemplateContext } from '@fluent-form/core';
import { InputGroupComponentSchema as ButtonGroupComponentSchema } from '../../schemas';

type ButtonGroupWidgetTemplateContext = WidgetTemplateContext<ButtonGroupComponentSchema, FormGroup>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    NgTemplateOutlet,
    ReactiveFormsModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentWithInjectorDirective,
    FluentControlPipe,
    FluentWidgetTemplatePipe,
    FluentTemplatePipe,
    FluentReactivePipe,
    InvokePipe
  ],
  templateUrl: './button-group.widget.html',
})
export class ButtonGroupWidget extends AbstractWidget<ButtonGroupWidgetTemplateContext> { }
