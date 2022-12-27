import { NgClass, NgFor, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FluentBinderDirective, FluentWithContextGuardDirective, FluentWithInjectorDirective } from '../../directives';
import { FluentControlPipe, FluentWidgetTemplateRefPipe } from '../../pipes';
import { FluentInvokePipe } from '../../pipes/invoke.pipe';
import { InputGroupComponentSchema } from '../../schemas';
import { isString } from '../../utils';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type InputGroupWidgetTemplateContext = WidgetTemplateContext<InputGroupComponentSchema, FormGroup>;

@Component({
  standalone: true,
  imports: [
    NgFor,
    NgClass,
    NgStyle,
    NgTemplateOutlet,
    ReactiveFormsModule,
    NzInputModule,
    FluentBinderDirective,
    FluentWithContextGuardDirective,
    FluentWithInjectorDirective,
    FluentControlPipe,
    FluentWidgetTemplateRefPipe,
    FluentInvokePipe,
  ],
  templateUrl: './input-group.widget.html',
})
export class InputGroupWidget extends AbstractWidget<InputGroupWidgetTemplateContext> {
  @ViewChild(TemplateRef, { static: true }) templateRef!: TemplateRef<InputGroupWidgetTemplateContext>;

  protected readonly helper = {
    addon: (addon: InputGroupComponentSchema['before'] | InputGroupComponentSchema['after']) =>
      isString(addon) || addon instanceof TemplateRef ? addon : undefined,
    addonIcon: (addon: InputGroupComponentSchema['before'] | InputGroupComponentSchema['after']) =>
      isString(addon) || addon instanceof TemplateRef ? undefined : addon?.icon,
  } as const;
}
