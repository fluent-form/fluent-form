import { NgClass, NgFor, NgIf, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AnyObject, SafeAny } from '@ngify/types';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FluentBindingDirective, TemplateRefHolder } from '../../directives';
import { FluentColumnPipe, FluentControlPipe, FluentReactivePipe, RenderablePipe } from '../../pipes';
import { AbstractSchema } from '../../schemas';
import { FluentFormItemOutletComponent } from '../form-item-outlet/form-item-outlet.component';
import { FluentGridModule } from '../grid';

@Component({
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgClass,
    NgStyle,
    NgTemplateOutlet,
    ReactiveFormsModule,
    NzFormModule,
    FluentGridModule,
    FluentFormItemOutletComponent,
    FluentBindingDirective,
    FluentReactivePipe,
    FluentControlPipe,
    FluentColumnPipe,
    RenderablePipe
  ],
  templateUrl: './form-content.component.html'
})
export class FormContentComponent extends TemplateRefHolder<{ form: FormGroup, model: AnyObject, schema: AbstractSchema, submit: EventEmitter<SafeAny> }> { }
