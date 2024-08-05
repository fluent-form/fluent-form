import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AbstractWidget, FluentBindingDirective, FluentContextGuardDirective, FluentTemplatePipe, InvokePipe, WidgetTemplateContext, isBoolean } from '@fluent-form/core';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { AlertComponentSchema } from '../../schemas';

type AlertWidgetTemplateContext = WidgetTemplateContext<AlertComponentSchema, FormGroup>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    NzAlertModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentTemplatePipe,
    InvokePipe,
  ],
  templateUrl: './alert.widget.html',
})
export class AlertWidget extends AbstractWidget<AlertWidgetTemplateContext> {
  protected readonly helper = {
    icon(icon: AlertComponentSchema['icon']) {
      return isBoolean(icon) ? null : icon;
    }
  } as const;
}
