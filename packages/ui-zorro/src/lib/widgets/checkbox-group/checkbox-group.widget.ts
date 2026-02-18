import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  AbstractWidget,
  ClassPipe,
  FluentBindingDirective,
  FluentContextGuardDirective,
  FluentReactivePipe,
  StylePipe,
  WidgetTemplateContext
} from '@fluent-form/core';
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
    FluentReactivePipe,
    ClassPipe,
    StylePipe
  ],
  templateUrl: './checkbox-group.widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class CheckboxGroupWidget extends AbstractWidget<CheckboxGroupWidgetTemplateContext> { }
