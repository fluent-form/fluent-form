import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AbstractWidget, FluentBindingDirective, FluentColumnPipe, FluentContextGuardDirective, FluentControlPipe, FluentFormItemOutletDirective, FluentGridModule, FluentParentRowDirective, FluentReactivePipe, RenderablePipe, WidgetTemplateContext } from '@fluent-form/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormGroupSchema } from '../../schemas';

type FormGroupWidgetTemplateContext = WidgetTemplateContext<FormGroupSchema, FormGroup>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    NgClass,
    NgStyle,
    NgTemplateOutlet,
    NzFormModule,
    FluentGridModule,
    FluentFormItemOutletDirective,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentParentRowDirective,
    FluentColumnPipe,
    FluentReactivePipe,
    FluentControlPipe,
    RenderablePipe
  ],
  templateUrl: './form-group.widget.html',
})
export class FormGroupWidget extends AbstractWidget<FormGroupWidgetTemplateContext> { }
