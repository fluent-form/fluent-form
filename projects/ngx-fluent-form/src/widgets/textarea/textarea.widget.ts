import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FluentBindingDirective, FluentComposableDirective, FluentContextGuardDirective } from '../../directives';
import { FluentCallPipe, FluentColumnPipe, FluentInvokePipe } from '../../pipes';
import { TextareaControlSchema } from '../../schemas';
import { AbstractTextControlWidget, WidgetTemplateContext } from '../abstract.widget';

type TextareaWidgetTemplateContext = WidgetTemplateContext<TextareaControlSchema, FormControl<string>>;

@Component({
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    NgStyle,
    ReactiveFormsModule,
    NzGridModule,
    NzInputModule,
    NzAutocompleteModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentComposableDirective,
    FluentCallPipe,
    FluentInvokePipe,
    FluentColumnPipe
  ],
  templateUrl: './textarea.widget.html',
})
export class TextareaWidget extends AbstractTextControlWidget<TextareaWidgetTemplateContext> { }
