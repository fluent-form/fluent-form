import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import type { FieldGroupComponentSchema } from '../../schemas';
import {
  AbstractWidget,
  FluentBindingDirective,
  FluentContextGuardDirective,
  FluentControlPipe,
  FluentWidgetTemplatePipe,
  FluentWithInjectorDirective,
  type WidgetTemplateContext
} from '@fluent-form/core';

type InputGroupWidgetTemplateContext = WidgetTemplateContext<FieldGroupComponentSchema, FormGroup>;

/**
 * @internal
 */
@Component({
  imports: [
    NgTemplateOutlet,
    ReactiveFormsModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentWithInjectorDirective,
    FluentControlPipe,
    FluentWidgetTemplatePipe
  ],
  templateUrl: './input-group.widget.html'
})
export class InputGroupWidget extends AbstractWidget<InputGroupWidgetTemplateContext> { }
