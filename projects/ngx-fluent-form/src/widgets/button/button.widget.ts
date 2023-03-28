import { NgClass, NgIf, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FluentBindingDirective, FluentContextGuardDirective } from '../../directives';
import { FluentCallPipe, FluentInvokePipe } from '../../pipes';
import { ButtonComponentSchema } from '../../schemas';
import { isString } from '../../utils';
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
    FluentInvokePipe
  ],
  templateUrl: './button.widget.html',
})
export class ButtonWidget extends AbstractWidget<ButtonWidgetTemplateContext> {
  protected readonly helper = {
    icon: {
      type: (icon: ButtonComponentSchema['icon']) => isString(icon) ? icon : icon!.type,
      rotate: (icon: ButtonComponentSchema['icon']) => isString(icon) || !icon?.rotate ? 0 : icon.rotate,
      spin: (icon: ButtonComponentSchema['icon']) => isString(icon) || !icon?.spin ? false : icon.spin,
      theme: (icon: ButtonComponentSchema['icon']) => isString(icon) || !icon?.theme ? 'outline' : icon.theme
    }
  } as const;
}
