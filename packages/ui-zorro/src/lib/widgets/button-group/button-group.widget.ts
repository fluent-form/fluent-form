import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  AbstractWidget,
  FluentBindingDirective,
  FluentContextGuardDirective,
  FluentWidgetTemplatePipe,
  FluentWithInjectorDirective,
  WidgetTemplateContext
} from '@fluent-form/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ButtonGroupComponentSchema } from '../../schemas';

type ButtonGroupWidgetTemplateContext = WidgetTemplateContext<ButtonGroupComponentSchema, FormGroup>;

/**
 * @internal
 */
@Component({
  imports: [
    NgTemplateOutlet,
    NzButtonModule,
    FluentBindingDirective,
    FluentWithInjectorDirective,
    FluentContextGuardDirective,
    FluentWidgetTemplatePipe
  ],
  templateUrl: './button-group.widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonGroupWidget extends AbstractWidget<ButtonGroupWidgetTemplateContext> { }
