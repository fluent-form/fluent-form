import { NgClass, NgFor, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { FluentFormColContentOutletComponent } from '../../components';
import { FluentBinderDirective, FluentConfigDirective, FluentContextGuardDirective } from '../../directives';
import { FluentCallPipe, FluentColumnPipe, FluentControlPipe } from '../../pipes';
import { TabsComponentSchema } from '../../schemas';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type TabsWidgetTemplateContext = WidgetTemplateContext<TabsComponentSchema, FormGroup>;

@Component({
  standalone: true,
  imports: [
    NgFor,
    NgClass,
    NgStyle,
    NgTemplateOutlet,
    NzTabsModule,
    NzGridModule,
    FluentFormColContentOutletComponent,
    FluentBinderDirective,
    FluentConfigDirective,
    FluentContextGuardDirective,
    FluentCallPipe,
    FluentControlPipe,
    FluentColumnPipe
  ],
  templateUrl: './tabs.widget.html',
})
export class TabsWidget extends AbstractWidget<TabsWidgetTemplateContext> { }
