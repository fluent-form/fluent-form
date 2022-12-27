import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FluentBinderDirective, FluentComposableDirective, FluentWithContextGuardDirective } from '../../directives';
import { FluentCallPipe, FluentTypeofPipe } from '../../pipes';
import { FluentInvokePipe } from '../../pipes/invoke.pipe';
import { NumberInputControlSchema } from '../../schemas';
import { isNumber } from '../../utils';
import { AbstractWidget, COL_HELPER, WidgetTemplateContext } from '../abstract.widget';

type NumberWidgetTemplateContext = WidgetTemplateContext<NumberInputControlSchema, FormControl<number>>;

@Component({
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    NgStyle,
    ReactiveFormsModule,
    NzGridModule,
    NzInputNumberModule,
    FluentBinderDirective,
    FluentWithContextGuardDirective,
    FluentComposableDirective,
    FluentTypeofPipe,
    FluentCallPipe,
    FluentInvokePipe
  ],
  templateUrl: './number.widget.html',
  styles: [`nz-input-number { width: 100% }`]
})
export class NumberWidget extends AbstractWidget<NumberWidgetTemplateContext> {
  @ViewChild(TemplateRef, { static: true }) templateRef!: TemplateRef<NumberWidgetTemplateContext>;

  protected readonly infinity = Infinity;

  protected readonly helper = {
    col: COL_HELPER,
    precision: (precision: NumberInputControlSchema['precision']) =>
      isNumber(precision) ? precision : precision?.value,
    precisionMode: (precision: NumberInputControlSchema['precision']) =>
      isNumber(precision) || !precision?.mode ? 'toFixed' : precision.mode,
  } as const;
}
