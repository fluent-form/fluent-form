import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AbstractWidget, FluentBindingDirective, FluentColumnPipe, FluentContextGuardDirective, FluentGridModule, FluentInjectDirective, FluentReactivePipe, InvokePipe, Length, WidgetTemplateContext, isNumber } from '@fluent-form/core';
import { NzFormNoStatusService } from 'ng-zorro-antd/core/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { TextareaControlSchema } from '../../schemas';

type TextareaWidgetTemplateContext = WidgetTemplateContext<TextareaControlSchema, FormControl<string>>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    NgStyle,
    ReactiveFormsModule,
    NzInputModule,
    FluentGridModule,
    FluentInjectDirective,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentReactivePipe,
    FluentColumnPipe,
    InvokePipe
  ],
  templateUrl: './textarea.widget.html',
})
export class TextareaWidget extends AbstractWidget<TextareaWidgetTemplateContext> {
  protected readonly InputGroup = NzFormNoStatusService;
  protected readonly helper = {
    length: {
      min: (length?: Length) => {
        return isNumber(length) ? length : length?.min;
      },
      max: (length?: Length) => {
        return isNumber(length) ? length : length?.max;
      },
    }
  } as const;
}
