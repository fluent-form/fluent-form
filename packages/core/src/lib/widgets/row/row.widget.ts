import { NgClass, NgFor, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FluentBindingDirective, FluentContextGuardDirective, FluentFormItemOutletDirective, FluentGridModule, FluentParentRowDirective } from '../../directives';
import { FluentColumnPipe, FluentControlPipe, FluentReactivePipe } from '../../pipes';
import { RowComponentSchema } from '../../schemas';
import { AbstractWidget, WidgetTemplateContext } from '../widget';

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
