import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AbstractWidget, FluentBindingDirective, FluentColumnPipe, FluentContextGuardDirective, FluentControlWrapperDirective, FluentGridModule, FluentInjectDirective, FluentReactivePipe, FluentTemplatePipe, InvokePipe, WidgetTemplateContext, isString, isUndefined } from '@fluent-form/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ButtonComponentSchema, Icon } from '../../schemas';
import { NzSpaceCompactItemDirective } from '../space-compact/lib/space-compact-item.directive';

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
    NzSpaceCompactItemDirective,
    NzOutletModule,
    FluentInjectDirective,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentReactivePipe,
    FluentTemplatePipe,
    FluentGridModule,
    FluentColumnPipe,
    InvokePipe
  ],
  templateUrl: './button.widget.html',
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
