import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  AbstractWidget,
  ClassPipe,
  FluentBindingDirective,
  FluentContextGuardDirective,
  FluentTemplatePipe,
  InvokePipe,
  StylePipe,
  WidgetTemplateContext,
  isBoolean
} from '@fluent-form/core';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { AlertComponentSchema } from '../../schemas';

type AlertWidgetTemplateContext = WidgetTemplateContext<AlertComponentSchema, FormGroup>;

/**
 * @internal
 */
@Component({
  imports: [
    NzAlertModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentTemplatePipe,
    InvokePipe,
    ClassPipe,
    StylePipe
  ],
  templateUrl: './alert.widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class AlertWidget extends AbstractWidget<AlertWidgetTemplateContext> {
  protected readonly helper = {
    icon(icon: AlertComponentSchema['icon']) {
      return isBoolean(icon) ? null : icon;
    }
  } as const;
}
