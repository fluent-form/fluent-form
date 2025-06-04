import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AbstractWidget, FluentBindingDirective, FluentContextGuardDirective, WidgetTemplateContext } from '@fluent-form/core';
import { SafeAny } from '@ngify/types';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { CheckboxGroupControlSchema } from '../../schemas';

type CheckboxGroupWidgetTemplateContext = WidgetTemplateContext<CheckboxGroupControlSchema, FormControl<SafeAny[]>>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzCheckboxModule,
    FluentBindingDirective,
    FluentContextGuardDirective
  ],
  templateUrl: './checkbox-group.widget.html'
})
export class CheckboxGroupWidget extends AbstractWidget<CheckboxGroupWidgetTemplateContext> { }
