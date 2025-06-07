import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FluentBindingDirective, FluentContextGuardDirective } from '../../../directives';
import { AbstractWidget, WidgetTemplateContext } from '../../../widgets/widget';
import { TextFieldControlSchema } from '../../schemas';

type InputWidgetTemplateContext = WidgetTemplateContext<TextFieldControlSchema, FormControl<string>>;

/**
 * @internal
 */
@Component({
  imports: [
    ReactiveFormsModule,
    FluentBindingDirective,
    FluentContextGuardDirective
  ],
  templateUrl: './input.widget.html'
})
export class InputWidget extends AbstractWidget<InputWidgetTemplateContext> { }
