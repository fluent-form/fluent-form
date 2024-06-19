import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AbstractWidget, FluentBindingDirective, FluentContextGuardDirective, FluentControlPipe, FluentReactivePipe, FluentTemplatePipe, FluentWidgetTemplatePipe, FluentWithInjectorDirective, InvokePipe, WidgetTemplateContext, WithOutSchemaReactiveFn, isString } from '@fluent-form/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { InputGroupComponentSchema } from '../../schemas';

type InputGroupWidgetTemplateContext = WidgetTemplateContext<InputGroupComponentSchema, FormGroup>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
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
    FluentReactivePipe,
    InvokePipe
  ],
  templateUrl: './input-group.widget.html',
  styleUrls: ['./input-group.widget.scss']
})
export class InputGroupWidget extends AbstractWidget<InputGroupWidgetTemplateContext> {
  protected readonly helper = {
    addon: (addon: WithOutSchemaReactiveFn<NonNullable<InputGroupComponentSchema['addons']>['before']>) =>
      isString(addon) || addon instanceof TemplateRef ? addon : undefined
    ,
    addonIcon: (addon: WithOutSchemaReactiveFn<NonNullable<InputGroupComponentSchema['addons']>['before']>) =>
      isString(addon) || addon instanceof TemplateRef ? undefined : addon?.icon,
  } as const;
}
