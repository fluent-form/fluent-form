import { NgClass, NgFor, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FluentBindingDirective, FluentContextGuardDirective, FluentWithInjectorDirective } from '../../directives';
import { FluentControlPipe, FluentReactivePipe, FluentTemplatePipe, FluentWidgetTemplatePipe, InvokePipe } from '../../pipes';
import { NumberGroupComponentSchema } from '../../schemas';
import { isString } from '../../utils';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type NumberGroupWidgetTemplateContext = WidgetTemplateContext<NumberGroupComponentSchema, FormGroup>;

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
    NzInputNumberModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentWithInjectorDirective,
    FluentControlPipe,
    FluentWidgetTemplatePipe,
    FluentTemplatePipe,
    FluentReactivePipe,
    InvokePipe,
  ],
  templateUrl: './number-group.widget.html',
})
export class NumberGroupWidget extends AbstractWidget<NumberGroupWidgetTemplateContext> {
  protected readonly helper = {
    addon: (addon?: string | TemplateRef<void> | { icon: string }) =>
      isString(addon) || addon instanceof TemplateRef ? addon : undefined
    ,
    addonIcon: (addon?: string | TemplateRef<void> | { icon: string }) =>
      isString(addon) || addon instanceof TemplateRef ? undefined : addon?.icon,
  } as const;
}
