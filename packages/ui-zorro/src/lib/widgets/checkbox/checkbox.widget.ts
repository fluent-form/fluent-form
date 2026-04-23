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
    FluentContextGuardDirective,
    ClassPipe,
    StylePipe,
    FluentReactivePipe
  ],
  templateUrl: './checkbox.widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class CheckboxWidget extends AbstractWidget<CheckboxWidgetTemplateContext> { }
