import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AbstractWidget, FluentBindingDirective, FluentColumnPipe, FluentContextGuardDirective, FluentGridModule, FluentInjectDirective, FluentReactivePipe, FluentTemplatePipe, InvokePipe, WidgetTemplateContext, isString, isUndefined } from '@fluent-form/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormNoStatusService } from 'ng-zorro-antd/core/form';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ButtonComponentSchema, Icon } from '../../schemas';

type ButtonWidgetTemplateContext = WidgetTemplateContext<ButtonComponentSchema, FormGroup>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    NgClass,
    NgStyle,
    NgTemplateOutlet,
    NzButtonModule,
    NzIconModule,
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
  protected readonly InputGroup = NzFormNoStatusService;
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
