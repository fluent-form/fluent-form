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
  FluentTemplatePipe,
  WidgetTemplateContext
} from '@fluent-form/core';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NumberFieldControlSchema } from '../../schemas';

type NumberFieldWidgetTemplateContext = WidgetTemplateContext<NumberFieldControlSchema, FormControl<number>>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzInputNumberModule,
    NzOutletModule,
    FluentGridModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentReactivePipe,
    FluentColumnPipe,
    FluentTemplatePipe,
    FluentInjectPipe
  ],
  templateUrl: './number-field.widget.html',
  styles: `nz-input-number,nz-input-number-group { width: 100% }`
})
export class NumberFieldWidget extends AbstractWidget<NumberFieldWidgetTemplateContext> {
  protected readonly ControlWrapperDirective = FluentControlWrapperDirective;
  protected readonly infinity = Infinity;
}
