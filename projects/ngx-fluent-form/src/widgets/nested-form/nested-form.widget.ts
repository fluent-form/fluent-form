import { NgClass, NgFor, NgIf, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FluentFormColContentOutletComponent } from '../../components';
import { FluentBinderDirective, FluentConfigDirective, FluentContextGuardDirective } from '../../directives';
import { FluentCallPipe, FluentColumnPipe, FluentControlPipe } from '../../pipes';
import { FormArraySchema, FormGroupSchema } from '../../schemas';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type NestedFormWidgetTemplateContext = WidgetTemplateContext<FormGroupSchema, FormGroup> | WidgetTemplateContext<FormArraySchema, FormArray>;

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
    FluentBinderDirective,
    FluentContextGuardDirective,
    FluentConfigDirective,
    FluentColumnPipe,
    FluentCallPipe,
    FluentControlPipe
  ],
  templateUrl: './nested-form.widget.html',
})
export class NestedFormWidget extends AbstractWidget<NestedFormWidgetTemplateContext> { }
