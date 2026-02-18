import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import type { ButtonGroupComponentSchema } from '../../schemas';
import {
  AbstractWidget,
  ClassPipe,
  FluentBindingDirective,
  FluentContextGuardDirective,
  FluentControlPipe,
  FluentWidgetTemplatePipe,
  FluentWithInjectorDirective,
  StylePipe,
  type WidgetTemplateContext
} from '@fluent-form/core';

type ButtonGroupWidgetTemplateContext = WidgetTemplateContext<ButtonGroupComponentSchema, FormGroup>;

/**
 * @internal
 */
@Component({
  imports: [
    AsyncPipe,
    NgTemplateOutlet,
    ReactiveFormsModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentWithInjectorDirective,
    FluentControlPipe,
    FluentWidgetTemplatePipe,
    ClassPipe,
    StylePipe
  ],
  templateUrl: './button-group.widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonGroupWidget extends AbstractWidget<ButtonGroupWidgetTemplateContext> { }
