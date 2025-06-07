import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AbstractWidget, FluentBindingDirective, FluentContextGuardDirective, WidgetTemplateContext } from '@fluent-form/core';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { SliderControlSchema } from '../../schemas';

type SilderWidgetTemplateContext = WidgetTemplateContext<SliderControlSchema, FormControl<number>>;

/**
 * @internal
 */
@Component({
  imports: [
    ReactiveFormsModule,
    NzSliderModule,
    FluentBindingDirective,
    FluentContextGuardDirective
  ],
  templateUrl: './silder.widget.html',
  styles: [`nz-slider { display: block; }`]
})
export class SilderWidget extends AbstractWidget<SilderWidgetTemplateContext> { }
