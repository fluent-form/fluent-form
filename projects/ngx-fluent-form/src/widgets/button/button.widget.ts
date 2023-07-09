import { NgClass, NgIf, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FluentBindingDirective, FluentContextGuardDirective } from '../../directives';
import { FluentCallPipe, InvokePipe } from '../../pipes';
import { ButtonComponentSchema } from '../../schemas';
import { Icon } from '../../schemas/interfaces';
import { isString, isUndefined } from '../../utils';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type ButtonWidgetTemplateContext = WidgetTemplateContext<ButtonComponentSchema, FormGroup>;

@Component({
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    NgStyle,
    NgTemplateOutlet,
    NzButtonModule,
    NzIconModule,
    NzOutletModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentCallPipe,
    InvokePipe
  ],
  templateUrl: './button.widget.html',
})
export class ButtonWidget extends AbstractWidget<ButtonWidgetTemplateContext> {
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
