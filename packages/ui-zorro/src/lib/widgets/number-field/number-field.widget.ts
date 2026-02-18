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
  StylePipe,
  WidgetTemplateContext
} from '@fluent-form/core';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { StatusPipe } from '../../pipes';
import { NumberFieldControlSchema } from '../../schemas';

type NumberFieldWidgetTemplateContext = WidgetTemplateContext<NumberFieldControlSchema, FormControl<number>>;

/**
 * @internal
 */
@Component({
  imports: [
    ReactiveFormsModule,
    NzInputNumberModule,
    FluentTemplateOutlet,
    FluentGridModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentReactivePipe,
    FluentColumnPipe,
    FluentTemplatePipe,
    FluentInjectPipe,
    StatusPipe,
    ClassPipe,
    StylePipe
  ],
  templateUrl: './number-field.widget.html',
  styles: `nz-input-number { width: 100% }`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class NumberFieldWidget extends AbstractWidget<NumberFieldWidgetTemplateContext> {
  protected readonly ControlWrapperDirective = FluentControlWrapperDirective;
  protected readonly infinity = Infinity;
}
