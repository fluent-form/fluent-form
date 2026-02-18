import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AbstractWidget, ClassPipe, FluentBindingDirective, FluentContextGuardDirective, StylePipe, WidgetTemplateContext } from '@fluent-form/core';
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
    FluentContextGuardDirective,
    ClassPipe,
    StylePipe
  ],
  templateUrl: './silder.widget.html',
  styles: `nz-slider { display: block; }`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class SilderWidget extends AbstractWidget<SilderWidgetTemplateContext> { }
