import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import type { FieldGroupComponentSchema } from '../../schemas';
import {
  AbstractWidget,
  FluentBindingDirective,
  FluentContextGuardDirective,
  FluentControlPipe,
  FluentReactivePipe,
  FluentTemplatePipe,
  FluentWidgetTemplatePipe,
  FluentWithInjectorDirective,
  InvokePipe,
  type WidgetTemplateContext
} from '@fluent-form/core';

type InputGroupWidgetTemplateContext = WidgetTemplateContext<FieldGroupComponentSchema, FormGroup>;

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
  templateUrl: './input-group.widget.html'
})
export class InputGroupWidget extends AbstractWidget<InputGroupWidgetTemplateContext> { }
