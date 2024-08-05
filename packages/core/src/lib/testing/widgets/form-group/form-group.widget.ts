import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FluentBindingDirective, FluentContextGuardDirective, FluentFormItemOutletDirective, FluentGridModule, FluentParentRowDirective } from '../../../directives';
import { FluentColumnPipe, FluentControlPipe, FluentReactivePipe, RenderablePipe } from '../../../pipes';
import { AbstractWidget, WidgetTemplateContext } from '../../../widgets/widget';
import { FormGroupSchema } from '../../schemas';

type FormGroupWidgetTemplateContext = WidgetTemplateContext<FormGroupSchema, FormGroup>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    NgTemplateOutlet,
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
