import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FluentBindingDirective, FluentContextGuardDirective, FluentFormFieldOutletDirective, FluentGridModule } from '../../directives';
import { FluentColumnPipe, FluentControlPipe, FluentReactivePipe, RenderablePipe } from '../../pipes';
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
    FluentFormFieldOutletDirective,
    FluentBindingDirective,
    FluentReactivePipe,
    FluentContextGuardDirective,
    FluentColumnPipe,
    FluentControlPipe,
    RenderablePipe
  ],
  templateUrl: './row.widget.html'
})
export class RowWidget extends AbstractWidget<RowWidgetTemplateContext> { }
