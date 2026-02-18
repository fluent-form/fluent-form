import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FluentBindingDirective, FluentContextGuardDirective, FluentGridModule, FluentWidgetWrapperOutlet } from '../../../directives';
import { ClassPipe, FluentColumnPipe, FluentControlPipe, FluentReactivePipe, RenderablePipe, StylePipe } from '../../../pipes';
import { AbstractWidget, type WidgetTemplateContext } from '../../../widgets/widget';
import type { FormGroupSchema } from '../../schemas';

type FormGroupWidgetTemplateContext = WidgetTemplateContext<FormGroupSchema, FormGroup>;

/**
 * @internal
 */
@Component({
  imports: [
    NgTemplateOutlet,
    FluentGridModule,
    FluentWidgetWrapperOutlet,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentColumnPipe,
    FluentReactivePipe,
    FluentControlPipe,
    RenderablePipe,
    ClassPipe,
    StylePipe
  ],
  templateUrl: './form-group.widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormGroupWidget extends AbstractWidget<FormGroupWidgetTemplateContext> { }
