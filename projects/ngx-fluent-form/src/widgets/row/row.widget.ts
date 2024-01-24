import { NgClass, NgFor, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FluentFormColContentOutletComponent, FluentGridModule } from '../../components';
import { FluentBindingDirective, FluentContextGuardDirective, FluentParentRowDirective } from '../../directives';
import { FluentColumnPipe, FluentControlPipe, FluentReactivePipe } from '../../pipes';
import { RowComponentSchema } from '../../schemas';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

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
    FluentFormColContentOutletComponent,
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
