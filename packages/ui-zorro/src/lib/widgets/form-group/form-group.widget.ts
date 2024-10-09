import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AbstractWidget, FluentBindingDirective, FluentColumnPipe, FluentContextGuardDirective, FluentControlPipe, FluentFormItemOutletDirective, FluentGridModule, FluentReactivePipe, RenderablePipe, WidgetTemplateContext } from '@fluent-form/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormGroupSchema } from '../../schemas';

type FormGroupWidgetTemplateContext = WidgetTemplateContext<FormGroupSchema, FormGroup>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    NgTemplateOutlet,
    NzFormModule,
    FluentGridModule,
    FluentFormItemOutletDirective,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentColumnPipe,
    FluentReactivePipe,
    FluentControlPipe,
    RenderablePipe
  ],
  templateUrl: './form-group.widget.html',
})
export class FormGroupWidget extends AbstractWidget<FormGroupWidgetTemplateContext> { }
