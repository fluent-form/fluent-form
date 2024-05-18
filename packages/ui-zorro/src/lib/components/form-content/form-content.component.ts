import { NgClass, NgFor, NgIf, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, Directive, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AbstractSchema, FluentBindingDirective, FluentColumnPipe, FluentControlPipe, FluentGridModule, FluentReactivePipe, RenderablePipe, TemplateRefHolder } from '@fluent-form/core';
import { AnyObject } from '@ngify/types';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FluentFormItemContentComponent } from '../form-item-content/form-item-content.component';

@Directive()
export abstract class AbstractFormContentComponent extends TemplateRefHolder<{ form: FormGroup, model: AnyObject, schema: AbstractSchema, submit: EventEmitter<SubmitEvent> }> { }

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
    FluentFormItemContentComponent,
    FluentBindingDirective,
    FluentReactivePipe,
    FluentControlPipe,
    FluentColumnPipe,
    RenderablePipe
  ],
  templateUrl: './form-content.component.html'
})
export class FormContentComponent extends AbstractFormContentComponent { }
