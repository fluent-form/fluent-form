import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  AbstractWidget,
  ClassPipe,
  FluentBindingDirective,
  FluentColumnPipe,
  FluentContextGuardDirective,
  FluentControlPipe,
  FluentGridModule,
  FluentReactivePipe,
  FluentTemplatePipe,
  FluentWidgetWrapperOutlet,
  StylePipe,
  WidgetTemplateContext
} from '@fluent-form/core';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { StepsComponentSchema } from '../../schemas';

type StepsWidgetTemplateContext = WidgetTemplateContext<StepsComponentSchema, FormGroup>;

/**
 * @internal
 */
@Component({
  imports: [
    NgTemplateOutlet,
    NzStepsModule,
    FluentGridModule,
    FluentWidgetWrapperOutlet,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentReactivePipe,
    FluentControlPipe,
    FluentColumnPipe,
    FluentTemplatePipe,
    ClassPipe,
    StylePipe
  ],
  templateUrl: './steps.widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class StepsWidget extends AbstractWidget<StepsWidgetTemplateContext> { }
