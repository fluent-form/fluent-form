import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FluentBindingDirective, FluentContextGuardDirective } from '../../../directives';
import { ClassPipe, StylePipe } from '../../../pipes';
import { AbstractWidget, type WidgetTemplateContext } from '../../../widgets/widget';
import { NumberComponent } from '../../components/number/number.component';
import type { NumberFieldControlSchema } from '../../schemas';

type NumberWidgetTemplateContext = WidgetTemplateContext<NumberFieldControlSchema, FormControl<number>>;

/**
 * @internal
 */
@Component({
  imports: [
    ReactiveFormsModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    NumberComponent,
    ClassPipe,
    StylePipe
  ],
  templateUrl: './number.widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class NumberWidget extends AbstractWidget<NumberWidgetTemplateContext> { }
