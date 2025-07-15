import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  FluentTemplatePipe,
  InvokePipe,
  Length,
  WidgetTemplateContext,
  isNumber
} from '@fluent-form/core';
import { NzInputModule } from 'ng-zorro-antd/input';
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
    InvokePipe
  ],
  templateUrl: './text-field.widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextFieldWidget extends AbstractWidget<TextFieldWidgetTemplateContext> {
  protected readonly ControlWrapperDirective = FluentControlWrapperDirective;
  protected readonly helper = {
    length: {
      min: (length?: Length) => isNumber(length) ? length : length?.min,
      max: (length?: Length) => isNumber(length) ? length : length?.max
    }
  } as const;
}
