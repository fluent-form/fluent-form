import { NgClass, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FluentBindingDirective, FluentContextGuardDirective } from '../../directives';
import { FluentTemplatePipe } from '../../pipes';
import { ToggleControlSchema } from '../../schemas';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type ToggleWidgetTemplateContext = WidgetTemplateContext<ToggleControlSchema, FormControl<boolean>>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    NgClass,
    NgStyle,
    ReactiveFormsModule,
    NzSwitchModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentTemplatePipe
  ],
  templateUrl: './toggle.widget.html',
  styles: [`nz-switch { width: 100% }`]
})
export class ToggleWidget extends AbstractWidget<ToggleWidgetTemplateContext> { }
