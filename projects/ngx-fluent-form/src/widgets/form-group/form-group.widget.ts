import { NgClass, NgFor, NgIf, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FluentFormColContentOutletComponent } from '../../components';
import { FluentBindingDirective, FluentConfigDirective, FluentContextGuardDirective } from '../../directives';
import { FluentColumnPipe, FluentControlPipe, FluentReactivePipe } from '../../pipes';
import { FormGroupSchema } from '../../schemas';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type FormGroupWidgetTemplateContext = WidgetTemplateContext<FormGroupSchema, FormGroup>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgClass,
    NgStyle,
    NgTemplateOutlet,
    NzGridModule,
    NzFormModule,
    NzDividerModule,
    FluentFormColContentOutletComponent,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentConfigDirective,
    FluentColumnPipe,
    FluentReactivePipe,
    FluentControlPipe
  ],
  templateUrl: './form-group.widget.html',
})
export class FormGroupWidget extends AbstractWidget<FormGroupWidgetTemplateContext> { }
