import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AbstractWidget, FluentBindingDirective, FluentColumnPipe, FluentContextGuardDirective, FluentControlWrapperDirective, FluentGridModule, FluentInjectDirective, FluentReactivePipe, InvokePipe, WidgetTemplateContext, isNumber } from '@fluent-form/core';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NumberInputControlSchema } from '../../schemas';

type NumberWidgetTemplateContext = WidgetTemplateContext<NumberInputControlSchema, FormControl<number>>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzInputNumberModule,
    FluentGridModule,
    FluentInjectDirective,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentReactivePipe,
    FluentColumnPipe,
    InvokePipe
  ],
  templateUrl: './number.widget.html',
  styles: [`nz-input-number { width: 100% }`]
})
export class NumberWidget extends AbstractWidget<NumberWidgetTemplateContext> {
  protected readonly ControlWrapperDirective = FluentControlWrapperDirective;
  protected readonly infinity = Infinity;

  protected readonly helper = {
    precision: (precision: NumberInputControlSchema['precision']) =>
      isNumber(precision) ? precision : precision?.value,
    precisionMode: (precision: NumberInputControlSchema['precision']) =>
      isNumber(precision) || !precision?.mode ? 'toFixed' : precision.mode,
  } as const;
}
