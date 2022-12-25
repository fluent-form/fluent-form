import { NgClass, NgStyle } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { FluentBinderDirective, FluentWithContextGuardDirective } from '../../directives';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type CheckboxGroupWidgetTemplateContext = WidgetTemplateContext<any>;

@Component({
  standalone: true,
  imports: [
    NgClass,
    NgStyle,
    ReactiveFormsModule,
    NzCheckboxModule,
    FluentBinderDirective,
    FluentWithContextGuardDirective,
  ],
  templateUrl: './checkbox-group.widget.html',
})
export class CheckboxGroupWidget extends AbstractWidget<CheckboxGroupWidgetTemplateContext> {
  @ViewChild(TemplateRef, { static: true }) templateRef!: TemplateRef<CheckboxGroupWidgetTemplateContext>;
}
