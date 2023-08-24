import { NgClass, NgStyle } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { FluentBindingDirective, FluentContextGuardDirective } from '../../directives';
import { InvokePipe } from '../../pipes';
import { AlertComponentSchema } from '../../schemas';
import { isBoolean, isString } from '../../utils';
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
    InvokePipe
  ],
  templateUrl: './alert.widget.html',
})
export class AlertWidget extends AbstractWidget<AlertWidgetTemplateContext> {
  protected readonly helper = {
    closeText(closeable: AlertComponentSchema['closeable']) {
      return isBoolean(closeable) ? null : closeable?.content;
    },
    icon(icon: AlertComponentSchema['icon']) {
      if (isBoolean(icon) || isString(icon)) {
        return null;
      }
      return icon;
    },
    iconType(icon: AlertComponentSchema['icon']) {
      if (isBoolean(icon) || icon instanceof TemplateRef) {
        return null;
      }
      return icon;
    }
  } as const;
}
