import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FluentBindingDirective, FluentContextGuardDirective } from '../../../directives';
import { ClassPipe, StylePipe } from '../../../pipes';
import { AbstractWidget, type WidgetTemplateContext } from '../../../widgets/widget';
import type { TextFieldControlSchema } from '../../schemas';

type InputWidgetTemplateContext = WidgetTemplateContext<TextFieldControlSchema, FormControl<string>>;

/**
 * @internal
 */
@Component({
  imports: [
    ReactiveFormsModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    ClassPipe,
    StylePipe
  ],
  templateUrl: './input.widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputWidget extends AbstractWidget<InputWidgetTemplateContext> { }
