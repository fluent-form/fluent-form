import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AbstractWidget, FluentBindingDirective, FluentColumnPipe, FluentContextGuardDirective, FluentControlPipe, FluentFormItemOutletDirective, FluentGridModule, FluentParentRowDirective, FluentReactivePipe, WidgetTemplateContext } from '@fluent-form/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { TabsComponentSchema } from '../../schemas';

type TabsWidgetTemplateContext = WidgetTemplateContext<TabsComponentSchema, FormGroup>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    NgTemplateOutlet,
    NzTabsModule,
    FluentGridModule,
    FluentFormItemOutletDirective,
    FluentBindingDirective,
    FluentParentRowDirective,
    FluentContextGuardDirective,
    FluentReactivePipe,
    FluentControlPipe,
    FluentColumnPipe
  ],
  templateUrl: './tabs.widget.html',
})
export class TabsWidget extends AbstractWidget<TabsWidgetTemplateContext> { }
