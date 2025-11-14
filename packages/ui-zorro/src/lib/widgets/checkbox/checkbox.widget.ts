import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AbstractWidget, FluentBindingDirective, FluentContextGuardDirective, WidgetTemplateContext } from '@fluent-form/core';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { CheckboxControlSchema } from '../../schemas';

type CheckboxWidgetTemplateContext = WidgetTemplateContext<CheckboxControlSchema, FormControl<boolean>>;

/**
 * @internal
 */
@Component({
  imports: [
    ReactiveFormsModule,
    NzCheckboxModule,
    FluentBindingDirective,
    FluentContextGuardDirective
  ],
  templateUrl: './checkbox.widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class CheckboxWidget extends AbstractWidget<CheckboxWidgetTemplateContext> { }
