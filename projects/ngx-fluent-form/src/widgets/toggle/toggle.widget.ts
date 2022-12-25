import { NgClass, NgStyle } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FluentBinderDirective, FluentWithContextGuardDirective } from '../../directives';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type ToggleWidgetTemplateContext = WidgetTemplateContext<any>;

@Component({
  standalone: true,
  imports: [
    NgClass,
    NgStyle,
    ReactiveFormsModule,
    NzSwitchModule,
    FluentBinderDirective,
    FluentWithContextGuardDirective,
  ],
  templateUrl: './toggle.widget.html',
  styles: [`nz-switch { width: 100% }`]
})
export class ToggleWidget extends AbstractWidget<ToggleWidgetTemplateContext> {
  @ViewChild(TemplateRef, { static: true }) templateRef!: TemplateRef<ToggleWidgetTemplateContext>;
}
