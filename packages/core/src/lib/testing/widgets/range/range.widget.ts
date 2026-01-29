import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FluentBindingDirective, FluentContextGuardDirective } from '../../../directives';
import { AbstractWidget, type WidgetTemplateContext } from '../../../widgets/widget';
import { RangeComponent } from '../../components';
import type { RangeControlSchema } from '../../schemas';

type RangeWidgetTemplateContext = WidgetTemplateContext<RangeControlSchema, FormControl<[number, number]>>;

/**
 * @internal
 */
@Component({
  imports: [
    ReactiveFormsModule,
    RangeComponent,
    FluentBindingDirective,
    FluentContextGuardDirective
  ],
  templateUrl: './range.widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RangeWidget extends AbstractWidget<RangeWidgetTemplateContext> { }
