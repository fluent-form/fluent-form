import { NgClass, NgFor, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FluentBinderDirective, FluentContextGuardDirective, FluentWithInjectorDirective } from '../../directives';
import { FluentTemplatePipe } from '../../pipes';
import { ButtonGroupComponentSchema } from '../../schemas';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type ButtonGroupWidgetTemplateContext = WidgetTemplateContext<ButtonGroupComponentSchema, FormGroup>;

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
    FluentContextGuardDirective,
    FluentTemplatePipe
  ],
  templateUrl: './button-group.widget.html',
})
export class ButtonGroupWidget extends AbstractWidget<ButtonGroupWidgetTemplateContext> { }
