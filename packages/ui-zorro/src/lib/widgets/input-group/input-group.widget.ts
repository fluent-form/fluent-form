import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AbstractWidget, FluentBindingDirective, FluentContextGuardDirective, FluentControlPipe, FluentControlWrapperDirective, FluentWidgetTemplatePipe, FluentWithInjectorDirective, WidgetTemplateContext } from '@fluent-form/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { InputGroupComponentSchema } from '../../schemas';

type InputGroupWidgetTemplateContext = WidgetTemplateContext<InputGroupComponentSchema, FormGroup>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    NgTemplateOutlet,
    NzInputModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentWithInjectorDirective,
    FluentControlPipe,
    FluentWidgetTemplatePipe,
    FluentControlWrapperDirective,
  ],
  templateUrl: './input-group.widget.html',
  styleUrl: './input-group.widget.scss'
})
export class InputGroupWidget extends AbstractWidget<InputGroupWidgetTemplateContext> { }
