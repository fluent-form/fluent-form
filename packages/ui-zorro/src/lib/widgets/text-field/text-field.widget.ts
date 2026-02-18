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
  FluentTemplateOutlet,
  FluentTemplatePipe,
  InvokePipe,
  Length,
  StylePipe,
  WidgetTemplateContext,
  isNumber
} from '@fluent-form/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { StatusPipe } from '../../pipes';
import { TextFieldControlSchema } from '../../schemas';

type TextFieldWidgetTemplateContext = WidgetTemplateContext<TextFieldControlSchema, FormControl<string>>;

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
    FluentTemplatePipe,
    FluentInjectPipe,
    FluentTemplateOutlet,
    InvokePipe,
    StatusPipe,
    ClassPipe,
    StylePipe
  ],
  templateUrl: './text-field.widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class TextFieldWidget extends AbstractWidget<TextFieldWidgetTemplateContext> {
  protected readonly ControlWrapperDirective = FluentControlWrapperDirective;
  protected readonly helper = {
    length: {
      min: (length?: Length) => isNumber(length) ? length : length?.min,
      max: (length?: Length) => isNumber(length) ? length : length?.max
    }
  } as const;
}
