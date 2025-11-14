import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  AbstractWidget,
  FluentBindingDirective,
  FluentContextGuardDirective,
  FluentTemplateOutlet,
  FluentTemplatePipe,
  WidgetTemplateContext
} from '@fluent-form/core';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { RateControlSchema } from '../../schemas';

type RateWidgetTemplateContext = WidgetTemplateContext<RateControlSchema, FormControl<number>>;

/**
 * @internal
 */
@Component({
  imports: [
    ReactiveFormsModule,
    NzRateModule,
    FluentTemplateOutlet,
    FluentTemplateOutlet,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentTemplatePipe
  ],
  templateUrl: './rate.widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class RateWidget extends AbstractWidget<RateWidgetTemplateContext> { }
