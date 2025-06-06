import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  AbstractWidget,
  FluentBindingDirective,
  FluentColumnPipe,
  FluentContextGuardDirective,
  FluentControlWrapperDirective,
  FluentGridModule,
  FluentInjectPipe,
  FluentReactivePipe,
  FluentTemplateOutlet,
  FluentTemplatePipe,
  InvokePipe,
  WidgetTemplateContext,
  isString,
  isUndefined
} from '@fluent-form/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ButtonComponentSchema, Icon } from '../../schemas';

type ButtonWidgetTemplateContext = WidgetTemplateContext<ButtonComponentSchema, FormGroup>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    NgTemplateOutlet,
    NzButtonModule,
    NzIconModule,
    FluentTemplateOutlet,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentReactivePipe,
    FluentTemplatePipe,
    FluentInjectPipe,
    FluentGridModule,
    FluentColumnPipe,
    InvokePipe
  ],
  templateUrl: './button.widget.html'
})
export class ButtonWidget extends AbstractWidget<ButtonWidgetTemplateContext> {
  protected readonly ControlWrapperDirective = FluentControlWrapperDirective;
  protected readonly helper = {
    icon: (icon: ButtonComponentSchema['icon']): Icon | undefined => {
      if (isUndefined(icon)) {
        return icon;
      }

      if (isString(icon)) {
        return { type: icon };
      }

      return icon;
    }
  } as const;
}
