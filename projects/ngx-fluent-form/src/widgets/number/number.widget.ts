import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NzFormNoStatusService } from 'ng-zorro-antd/core/form';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FluentGridModule } from '../../components';
import { FluentBindingDirective, FluentContextGuardDirective, FluentInjectDirective } from '../../directives';
import { FluentColumnPipe, FluentReactivePipe, InvokePipe } from '../../pipes';
import { NumberInputControlSchema } from '../../schemas';
import { isNumber } from '../../utils';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type NumberWidgetTemplateContext = WidgetTemplateContext<NumberInputControlSchema, FormControl<number>>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    NgStyle,
    ReactiveFormsModule,
    NzInputNumberModule,
    FluentGridModule,
    FluentInjectDirective,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentReactivePipe,
    FluentColumnPipe,
    InvokePipe,
  ],
  templateUrl: './number.widget.html',
  styles: [`nz-input-number { width: 100% }`]
})
export class NumberWidget extends AbstractWidget<NumberWidgetTemplateContext> {
  protected readonly InputGroup = NzFormNoStatusService;
  protected readonly infinity = Infinity;

  protected readonly helper = {
    precision: (precision: NumberInputControlSchema['precision']) =>
      isNumber(precision) ? precision : precision?.value,
    precisionMode: (precision: NumberInputControlSchema['precision']) =>
      isNumber(precision) || !precision?.mode ? 'toFixed' : precision.mode,
  } as const;
}
