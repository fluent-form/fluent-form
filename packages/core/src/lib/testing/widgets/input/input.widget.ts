import { NgClass, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FluentBindingDirective, FluentContextGuardDirective } from '../../../directives';
import { AbstractWidget, WidgetTemplateContext } from '../../../widgets/widget';
import { InputControlSchema } from '../../schemas';

type InputWidgetTemplateContext = WidgetTemplateContext<InputControlSchema, FormControl<string>>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    NgClass,
    NgStyle,
    ReactiveFormsModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
  ],
  templateUrl: './input.widget.html',
})
export class InputWidget extends AbstractWidget<InputWidgetTemplateContext> { }
