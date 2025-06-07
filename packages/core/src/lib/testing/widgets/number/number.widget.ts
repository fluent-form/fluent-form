import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FluentBindingDirective, FluentContextGuardDirective } from '../../../directives';
import { AbstractWidget, WidgetTemplateContext } from '../../../widgets/widget';
import { NumberComponent } from '../../components/number/number.component';
import { NumberFieldControlSchema } from '../../schemas';

type NumberWidgetTemplateContext = WidgetTemplateContext<NumberFieldControlSchema, FormControl<number>>;

/**
 * @internal
 */
@Component({
  imports: [
    ReactiveFormsModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    NumberComponent
  ],
  templateUrl: './number.widget.html'
})
export class NumberWidget extends AbstractWidget<NumberWidgetTemplateContext> { }
