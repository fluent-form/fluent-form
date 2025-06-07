import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  AbstractWidget,
  FluentBindingDirective,
  FluentColumnPipe,
  FluentContextGuardDirective,
  FluentControlWrapperDirective,
  FluentGridModule,
  FluentInjectPipe,
  FluentReactivePipe,
  InvokePipe,
  Length,
  WidgetTemplateContext,
  isNumber
} from '@fluent-form/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { TextAreaControlSchema } from '../../schemas';

type TextAreaWidgetTemplateContext = WidgetTemplateContext<TextAreaControlSchema, FormControl<string>>;

/**
 * @internal
 */
@Component({
  imports: [
    ReactiveFormsModule,
    NzInputModule,
    FluentGridModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentReactivePipe,
    FluentColumnPipe,
    FluentInjectPipe,
    InvokePipe
  ],
  templateUrl: './text-area.widget.html'
})
export class TextAreaWidget extends AbstractWidget<TextAreaWidgetTemplateContext> {
  protected readonly ControlWrapperDirective = FluentControlWrapperDirective;
  protected readonly helper = {
    length: {
      min: (length?: Length) => {
        return isNumber(length) ? length : length?.min;
      },
      max: (length?: Length) => {
        return isNumber(length) ? length : length?.max;
      }
    }
  } as const;
}
