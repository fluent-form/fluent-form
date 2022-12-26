import { NgClass, NgStyle } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { FluentBinderDirective, FluentWithContextGuardDirective } from '../../directives';
import { CheckboxGroupControlSchema } from '../../schemas';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type CheckboxGroupWidgetTemplateContext = WidgetTemplateContext<CheckboxGroupControlSchema, FormControl<SafeAny[]>>;

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
