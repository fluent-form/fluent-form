import { NgClass, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { FluentBindingDirective, FluentContextGuardDirective } from '../../directives';
import { CheckboxControlSchema } from '../../schemas';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type CheckboxWidgetTemplateContext = WidgetTemplateContext<CheckboxControlSchema, FormControl<boolean>>;

@Component({
  standalone: true,
  imports: [
    NgClass,
    NgStyle,
    ReactiveFormsModule,
    NzCheckboxModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
  ],
  templateUrl: './checkbox.widget.html',
})
export class CheckboxWidget extends AbstractWidget<CheckboxWidgetTemplateContext> { }
