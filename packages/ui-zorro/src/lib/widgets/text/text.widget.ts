import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AbstractWidget, FluentBindingDirective, FluentColumnPipe, FluentContextGuardDirective, FluentControlWrapperDirective, FluentGridModule, FluentInjectPipe, FluentReactivePipe, FluentTemplatePipe, InvokePipe, Length, WidgetTemplateContext, isNumber } from '@fluent-form/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { affixHelper } from '../../helper';
import { TextFieldControlSchema } from '../../schemas';
import { NzSpaceCompactItemDirective } from '../space-compact/lib/space-compact-item.directive';

type TextWidgetTemplateContext = WidgetTemplateContext<TextFieldControlSchema, FormControl<string>>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzInputModule,
    NzSpaceCompactItemDirective,
    FluentGridModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentReactivePipe,
    FluentColumnPipe,
    FluentTemplatePipe,
    FluentInjectPipe,
    InvokePipe
  ],
  templateUrl: './text.widget.html',
})
export class TextWidget extends AbstractWidget<TextWidgetTemplateContext> {
  protected readonly ControlWrapperDirective = FluentControlWrapperDirective;
  protected readonly helper = {
    length: {
      min: (length?: Length) => isNumber(length) ? length : length?.min,
      max: (length?: Length) => isNumber(length) ? length : length?.max,
    },
    affix: affixHelper,
  } as const;
}
