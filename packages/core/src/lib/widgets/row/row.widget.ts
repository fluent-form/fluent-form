import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FluentBindingDirective, FluentContextGuardDirective, FluentGridModule, FluentWidgetWrapperOutlet } from '../../directives';
import { ClassPipe, FluentColumnPipe, FluentControlPipe, FluentReactivePipe, RenderablePipe, StylePipe } from '../../pipes';
import type { RowComponentSchema } from '../../schemas';
import { AbstractWidget, type WidgetTemplateContext } from '../widget';

type RowWidgetTemplateContext = WidgetTemplateContext<RowComponentSchema, FormGroup>;

/**
 * @internal
 */
@Component({
  imports: [
    NgTemplateOutlet,
    FluentGridModule,
    FluentWidgetWrapperOutlet,
    FluentBindingDirective,
    FluentReactivePipe,
    FluentContextGuardDirective,
    FluentColumnPipe,
    FluentControlPipe,
    RenderablePipe,
    StylePipe,
    ClassPipe
  ],
  templateUrl: './row.widget.html'
})
export class RowWidget extends AbstractWidget<RowWidgetTemplateContext> { }
