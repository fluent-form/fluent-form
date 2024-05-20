import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FluentBindingDirective, FluentContextGuardDirective, FluentGridModule, FluentInjectDirective } from '../../../directives';
import { FluentColumnPipe, FluentReactivePipe, InvokePipe } from '../../../pipes';
import { AbstractWidget, WidgetTemplateContext } from '../../../widgets/widget';
import { InputControlSchema } from '../../schemas';

type InputWidgetTemplateContext = WidgetTemplateContext<InputControlSchema, FormControl<string>>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    NgStyle,
    ReactiveFormsModule,
    FluentGridModule,
    FluentInjectDirective,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentReactivePipe,
    FluentColumnPipe,
    InvokePipe,
  ],
  templateUrl: './input.widget.html',
})
export class InputWidget extends AbstractWidget<InputWidgetTemplateContext> { }
