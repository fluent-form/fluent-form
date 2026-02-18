import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  AbstractWidget,
  ClassPipe,
  FluentBindingDirective,
  FluentColumnPipe,
  FluentContextGuardDirective,
  FluentControlWrapperDirective,
  FluentGridModule,
  FluentInjectPipe,
  FluentReactivePipe,
  InvokePipe,
  Length,
  StylePipe,
  WidgetTemplateContext,
  isNumber
} from '@fluent-form/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { StatusPipe } from '../../pipes';
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
    InvokePipe,
    StatusPipe,
    ClassPipe,
    StylePipe
  ],
  templateUrl: './text-area.widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class TextAreaWidget extends AbstractWidget<TextAreaWidgetTemplateContext> {
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
