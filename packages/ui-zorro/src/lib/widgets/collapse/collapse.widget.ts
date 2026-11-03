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
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { CollapseComponentSchema } from '../../schemas';

type CollapseWidgetTemplateContext = WidgetTemplateContext<CollapseComponentSchema, FormGroup>;

/**
 * @internal
 */
@Component({
  imports: [
    NgTemplateOutlet,
    NzCollapseModule,
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
  templateUrl: './collapse.widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class CollapseWidget extends AbstractWidget<CollapseWidgetTemplateContext> { }
