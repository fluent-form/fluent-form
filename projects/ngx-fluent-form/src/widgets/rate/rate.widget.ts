import { NgClass, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FluentBindingDirective, FluentContextGuardDirective } from '../../directives';
import { FluentTemplatePipe } from '../../pipes';
import { RateControlSchema } from '../../schemas';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type RateWidgetTemplateContext = WidgetTemplateContext<RateControlSchema, FormControl<number>>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    NgClass,
    NgStyle,
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
