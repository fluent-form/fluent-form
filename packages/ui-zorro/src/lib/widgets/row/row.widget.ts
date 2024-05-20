import { NgClass, NgFor, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AbstractWidget, FluentBindingDirective, FluentColumnPipe, FluentContextGuardDirective, FluentControlPipe, FluentFormItemOutletDirective, FluentGridModule, FluentParentRowDirective, FluentReactivePipe, RowComponentSchema, WidgetTemplateContext } from '@fluent-form/core';

type RowWidgetTemplateContext = WidgetTemplateContext<RowComponentSchema, FormGroup>;

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
    FluentGridModule,
    FluentFormItemOutletDirective,
    FluentBindingDirective,
    FluentParentRowDirective,
    FluentReactivePipe,
    FluentContextGuardDirective,
    FluentColumnPipe,
    FluentControlPipe
  ],
  templateUrl: './row.widget.html',
})
export class RowWidget extends AbstractWidget<RowWidgetTemplateContext> { }
