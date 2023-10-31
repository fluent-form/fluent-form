import { NgClass, NgFor, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FluentBindingDirective, FluentContextGuardDirective, FluentWithInjectorDirective } from '../../directives';
import { FluentControlPipe, FluentTemplatePipe, FluentWidgetTemplatePipe, InvokePipe } from '../../pipes';
import { InputGroupComponentSchema } from '../../schemas';
import { isString } from '../../utils';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type InputGroupWidgetTemplateContext = WidgetTemplateContext<InputGroupComponentSchema, FormGroup>;

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
    ReactiveFormsModule,
    NzInputModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentWithInjectorDirective,
    FluentControlPipe,
    FluentWidgetTemplatePipe,
    FluentTemplatePipe,
    InvokePipe,
  ],
  templateUrl: './input-group.widget.html',
})
export class InputGroupWidget extends AbstractWidget<InputGroupWidgetTemplateContext> {
  protected readonly helper = {
    addon: (addon: InputGroupComponentSchema['before'] | InputGroupComponentSchema['after']) =>
      isString(addon) || addon instanceof TemplateRef ? addon : undefined
    ,
    addonIcon: (addon: InputGroupComponentSchema['before'] | InputGroupComponentSchema['after']) =>
      isString(addon) || addon instanceof TemplateRef ? undefined : addon?.icon,
  } as const;
}
