import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FluentBindingDirective, FluentContextGuardDirective } from '../../../directives';
import { AbstractWidget, WidgetTemplateContext } from '../../../widgets/widget';
import { TextControlSchema } from '../../schemas';

type InputWidgetTemplateContext = WidgetTemplateContext<TextControlSchema, FormControl<string>>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
  ],
  templateUrl: './input.widget.html',
})
export class InputWidget extends AbstractWidget<InputWidgetTemplateContext> { }
