import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  AbstractWidget,
  FluentBindingDirective,
  FluentColumnPipe,
  FluentContextGuardDirective,
  FluentControlPipe,
  FluentFormFieldOutletDirective,
  FluentGridModule,
  FluentReactivePipe,
  WidgetTemplateContext
} from '@fluent-form/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { TabsComponentSchema } from '../../schemas';

type TabsWidgetTemplateContext = WidgetTemplateContext<TabsComponentSchema, FormGroup>;

/**
 * @internal
 */
@Component({
  imports: [
    NgTemplateOutlet,
    NzTabsModule,
    FluentGridModule,
    FluentFormFieldOutletDirective,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentReactivePipe,
    FluentControlPipe,
    FluentColumnPipe
  ],
  templateUrl: './tabs.widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class TabsWidget extends AbstractWidget<TabsWidgetTemplateContext> { }
