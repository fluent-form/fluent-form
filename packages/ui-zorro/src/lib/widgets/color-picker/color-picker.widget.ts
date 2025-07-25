import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  AbstractWidget,
  FluentBindingDirective,
  FluentContextGuardDirective,
  FluentReactivePipe,
  FluentTemplatePipe,
  WidgetTemplateContext
} from '@fluent-form/core';
import { NzColorPickerComponent } from 'ng-zorro-antd/color-picker';
import { ColorPickerControlSchema } from '../../schemas';

type ColorPickerWidgetTemplateContext = WidgetTemplateContext<ColorPickerControlSchema, FormControl<string>>;

/**
 * @internal
 */
@Component({
  imports: [
    ReactiveFormsModule,
    NzColorPickerComponent,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentTemplatePipe,
    FluentReactivePipe
  ],
  templateUrl: './color-picker.widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorPickerWidget extends AbstractWidget<ColorPickerWidgetTemplateContext> { }
