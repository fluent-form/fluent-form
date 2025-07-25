import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AbstractWidget, FluentBindingDirective, FluentContextGuardDirective, FluentReactivePipe, WidgetTemplateContext } from '@fluent-form/core';
import { SafeAny } from '@ngify/core';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { CheckboxGroupControlSchema } from '../../schemas';

type CheckboxGroupWidgetTemplateContext = WidgetTemplateContext<CheckboxGroupControlSchema, FormControl<SafeAny[]>>;

/**
 * @internal
 */
@Component({
  imports: [
    ReactiveFormsModule,
    NzCheckboxModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentReactivePipe
  ],
  templateUrl: './checkbox-group.widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxGroupWidget extends AbstractWidget<CheckboxGroupWidgetTemplateContext> { }
