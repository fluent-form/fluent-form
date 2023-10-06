import { NgClass, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { FluentBindingDirective, FluentContextGuardDirective } from '../../directives';
import { FluentTemplatePipe, InvokePipe } from '../../pipes';
import { AlertComponentSchema } from '../../schemas';
import { isBoolean } from '../../utils';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type AlertWidgetTemplateContext = WidgetTemplateContext<AlertComponentSchema, FormGroup>;

@Component({
  standalone: true,
  imports: [
    NgClass,
    NgStyle,
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
