import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FluentBindingDirective, FluentContextGuardDirective } from '../../../directives';
import { AbstractWidget, WidgetTemplateContext } from '../../../widgets/widget';
import { RangeComponent } from '../../components';
import { RangeControlSchema } from '../../schemas';

type RangeWidgetTemplateContext = WidgetTemplateContext<RangeControlSchema, FormControl<[number, number]>>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RangeComponent,
    FluentBindingDirective,
    FluentContextGuardDirective
  ],
  templateUrl: './range.widget.html'
})
export class RangeWidget extends AbstractWidget<RangeWidgetTemplateContext> { }
