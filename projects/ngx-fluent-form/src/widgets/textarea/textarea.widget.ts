import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FluentBinderDirective, FluentComposableDirective, FluentWithContextGuardDirective } from '../../directives';
import { FluentCallPipe, FluentTypeofPipe } from '../../pipes';
import { FluentInvokePipe } from '../../pipes/invoke.pipe';
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
    FluentBinderDirective,
    FluentWithContextGuardDirective,
    FluentComposableDirective,
    FluentTypeofPipe,
    FluentCallPipe,
    FluentInvokePipe
  ],
  templateUrl: './textarea.widget.html',
})
export class TextareaWidget extends AbstractTextControlWidget<TextareaWidgetTemplateContext> {
  @ViewChild(TemplateRef, { static: true }) templateRef!: TemplateRef<TextareaWidgetTemplateContext>;
}
