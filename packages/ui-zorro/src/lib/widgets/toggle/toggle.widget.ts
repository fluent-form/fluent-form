import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AbstractWidget, FluentBindingDirective, FluentContextGuardDirective, FluentReactivePipe, FluentTemplatePipe, WidgetTemplateContext } from '@fluent-form/core';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { ToggleControlSchema } from '../../schemas';

type ToggleWidgetTemplateContext = WidgetTemplateContext<ToggleControlSchema, FormControl<boolean>>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    NgStyle,
    ReactiveFormsModule,
    NzSwitchModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentTemplatePipe,
    FluentReactivePipe
  ],
  templateUrl: './toggle.widget.html',
  styles: [`nz-switch { width: 100% }`]
})
export class ToggleWidget extends AbstractWidget<ToggleWidgetTemplateContext> { }
