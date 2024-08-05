import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AbstractWidget, FluentBindingDirective, FluentContextGuardDirective, FluentTemplatePipe, WidgetTemplateContext } from '@fluent-form/core';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { RateControlSchema } from '../../schemas';

type RateWidgetTemplateContext = WidgetTemplateContext<RateControlSchema, FormControl<number>>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzRateModule,
    NzOutletModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentTemplatePipe,
  ],
  templateUrl: './rate.widget.html',
})
export class RateWidget extends AbstractWidget<RateWidgetTemplateContext> { }
