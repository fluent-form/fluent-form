import { NgClass, NgFor, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FluentFormColContentOutletComponent } from '../../components';
import { FluentBindingDirective, FluentConfigDirective, FluentContextGuardDirective } from '../../directives';
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
    NzGridModule,
    FluentFormColContentOutletComponent,
    FluentBindingDirective,
    FluentConfigDirective,
    FluentReactivePipe,
    FluentContextGuardDirective,
    FluentColumnPipe,
    FluentControlPipe
  ],
  templateUrl: './row.widget.html',
})
export class RowWidget extends AbstractWidget<RowWidgetTemplateContext> { }
