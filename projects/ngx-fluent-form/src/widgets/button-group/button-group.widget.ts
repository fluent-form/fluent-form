import { NgClass, NgFor, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FluentBinderDirective, FluentWithContextGuardDirective, FluentWithInjectorDirective } from '../../directives';
import { FluentWidgetTemplateRefPipe } from '../../pipes';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type ButtonGroupWidgetTemplateContext = WidgetTemplateContext<any>;

@Component({
  standalone: true,
  imports: [
    NgFor,
    NgClass,
    NgStyle,
    NgTemplateOutlet,
    NzButtonModule,
    FluentBinderDirective,
    FluentWithInjectorDirective,
    FluentWithContextGuardDirective,
    FluentWidgetTemplateRefPipe
  ],
  templateUrl: './button-group.widget.html',
})
export class ButtonGroupWidget extends AbstractWidget<ButtonGroupWidgetTemplateContext> {
  @ViewChild(TemplateRef, { static: true }) templateRef!: TemplateRef<ButtonGroupWidgetTemplateContext>;
}
