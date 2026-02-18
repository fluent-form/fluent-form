import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  AbstractWidget,
  ClassPipe,
  FluentBindingDirective,
  FluentContextGuardDirective,
  FluentReactivePipe,
  FluentTemplatePipe,
  StylePipe,
  WidgetTemplateContext
} from '@fluent-form/core';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { ToggleControlSchema } from '../../schemas';

type ToggleWidgetTemplateContext = WidgetTemplateContext<ToggleControlSchema, FormControl<boolean>>;

/**
 * @internal
 */
@Component({
  imports: [
    ReactiveFormsModule,
    NzSwitchModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentTemplatePipe,
    FluentReactivePipe,
    ClassPipe,
    StylePipe
  ],
  templateUrl: './toggle.widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ToggleWidget extends AbstractWidget<ToggleWidgetTemplateContext> { }
