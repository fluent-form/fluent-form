import { NgClass, NgFor, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { FluentFormColContentOutletComponent } from '../../components';
import { FluentBinderDirective, FluentConfigDirective, FluentWithContextGuardDirective } from '../../directives';
import { FluentCallPipe, FluentControlPipe } from '../../pipes';
import { FluentInvokePipe } from '../../pipes/invoke.pipe';
import { TabsComponentSchema } from '../../schemas';
import { AbstractWidget, COL_HELPER, WidgetTemplateContext } from '../abstract.widget';

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
    FluentWithContextGuardDirective,
    FluentCallPipe,
    FluentControlPipe,
    FluentInvokePipe
  ],
  templateUrl: './tabs.widget.html',
})
export class TabsWidget extends AbstractWidget<TabsWidgetTemplateContext> {
  protected readonly helper = { col: COL_HELPER } as const;
}
