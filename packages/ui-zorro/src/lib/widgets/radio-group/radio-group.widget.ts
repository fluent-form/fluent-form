import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AbstractWidget, FluentBindingDirective, FluentContextGuardDirective, WidgetTemplateContext } from '@fluent-form/core';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { RadioGroupControlSchema } from '../../schemas';

type RadioGroupWidgetTemplateContext = WidgetTemplateContext<RadioGroupControlSchema, FormControl>;

/**
 * @internal
 */
@Component({
  imports: [
    ReactiveFormsModule,
    NzRadioModule,
    FluentBindingDirective,
    FluentContextGuardDirective
  ],
  templateUrl: './radio-group.widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioGroupWidget extends AbstractWidget<RadioGroupWidgetTemplateContext> { }
