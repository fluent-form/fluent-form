import { NgTemplateOutlet } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AbstractWidget, FluentBindingDirective, FluentContextGuardDirective, FluentControlPipe, FluentReactivePipe, FluentTemplatePipe, FluentWidgetTemplatePipe, FluentWithInjectorDirective, InvokePipe, WidgetTemplateContext, WithoutSchemaReactiveFn, isString } from '@fluent-form/core';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NumberGroupComponentSchema } from '../../schemas';

type NumberGroupWidgetTemplateContext = WidgetTemplateContext<NumberGroupComponentSchema, FormGroup>;

/**
 * @internal
 */
@Component({
  selector: 'fluent-number-group',
  standalone: true,
  imports: [
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
    InvokePipe
  ],
  templateUrl: './number-group.widget.html',
  styleUrls: ['./number-group.widget.scss']
})
export class NumberGroupWidget extends AbstractWidget<NumberGroupWidgetTemplateContext> {
  protected readonly helper = {
    addon: (addon?: WithoutSchemaReactiveFn<NonNullable<NumberGroupComponentSchema['addons']>['before']>) =>
      isString(addon) || addon instanceof TemplateRef ? addon : undefined
    ,
    addonIcon: (addon?: WithoutSchemaReactiveFn<NonNullable<NumberGroupComponentSchema['addons']>['before']>) =>
      isString(addon) || addon instanceof TemplateRef ? undefined : addon?.icon,
  } as const;
}
