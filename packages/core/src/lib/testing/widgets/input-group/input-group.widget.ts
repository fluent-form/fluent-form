import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import type { FieldGroupComponentSchema } from '../../schemas';
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

type InputGroupWidgetTemplateContext = WidgetTemplateContext<FieldGroupComponentSchema, FormGroup>;

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
  templateUrl: './input-group.widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputGroupWidget extends AbstractWidget<InputGroupWidgetTemplateContext> { }
