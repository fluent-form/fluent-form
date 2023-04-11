import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FluentBindingDirective, FluentContextGuardDirective, FluentInjectDirective } from '../../directives';
import { FluentCallPipe, FluentColumnPipe, FluentInvokePipe } from '../../pipes';
import { InputControlSchema } from '../../schemas';
import { AbstractTextControlWidget, WidgetTemplateContext } from '../abstract.widget';

type InputWidgetTemplateContext = WidgetTemplateContext<InputControlSchema, FormControl<string>>;

@Component({
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    NgStyle,
    ReactiveFormsModule,
    NzInputModule,
    NzGridModule,
    NzAutocompleteModule,
    FluentInjectDirective,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentCallPipe,
    FluentInvokePipe,
    FluentColumnPipe
  ],
  templateUrl: './input.widget.html',
})
export class InputWidget extends AbstractTextControlWidget<InputWidgetTemplateContext> { }
