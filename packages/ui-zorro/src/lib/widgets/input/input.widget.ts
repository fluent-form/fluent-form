import { NgClass, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AbstractWidget, FluentBindingDirective, FluentColumnPipe, FluentContextGuardDirective, FluentGridModule, FluentInjectDirective, FluentReactivePipe, InvokePipe, Length, WidgetTemplateContext, isNumber } from '@fluent-form/core';
import { NzFormNoStatusService } from 'ng-zorro-antd/core/form';
import { NzInputModule } from 'ng-zorro-antd/input';
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
    NzInputModule,
    FluentGridModule,
    FluentInjectDirective,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentReactivePipe,
    FluentColumnPipe,
    InvokePipe
  ],
  templateUrl: './input.widget.html',
})
export class InputWidget extends AbstractWidget<InputWidgetTemplateContext> {
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