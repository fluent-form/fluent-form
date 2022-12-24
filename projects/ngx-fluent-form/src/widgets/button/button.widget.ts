import { NgClass, NgIf, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FluentBinderDirective, FluentWithContextGuardDirective } from '../../directives';
import { FluentCallPipe, FluentTypeofPipe } from '../../pipes';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type ButtonWidgetTemplateContext = WidgetTemplateContext<any>;

@Component({
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    NgStyle,
    NgTemplateOutlet,
    NzButtonModule,
    NzIconModule,
    NzOutletModule,
    FluentBinderDirective,
    FluentWithContextGuardDirective,
    FluentTypeofPipe,
    FluentCallPipe
  ],
  templateUrl: './button.widget.html',
})
export class ButtonWidget extends AbstractWidget<ButtonWidgetTemplateContext> {
  @ViewChild(TemplateRef, { static: true }) templateRef!: TemplateRef<ButtonWidgetTemplateContext>;
}
