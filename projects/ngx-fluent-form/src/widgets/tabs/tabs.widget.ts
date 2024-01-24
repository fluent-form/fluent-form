import { NgClass, NgFor, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { FluentFormColContentOutletComponent, FluentGridModule } from '../../components';
import { FluentBindingDirective, FluentContextGuardDirective, FluentParentRowDirective } from '../../directives';
import { FluentColumnPipe, FluentControlPipe, FluentReactivePipe } from '../../pipes';
import { TabsComponentSchema } from '../../schemas';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type TabsWidgetTemplateContext = WidgetTemplateContext<TabsComponentSchema, FormGroup>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    NgFor,
    NgClass,
    NgStyle,
    NgTemplateOutlet,
    NzTabsModule,
    FluentGridModule,
    FluentFormColContentOutletComponent,
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
