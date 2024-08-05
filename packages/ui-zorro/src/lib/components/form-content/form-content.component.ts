import { NgTemplateOutlet } from '@angular/common';
import { Component, Directive, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AbstractSchema, FluentBindingDirective, FluentColumnPipe, FluentControlPipe, FluentFormItemOutletDirective, FluentGridModule, FluentReactivePipe, RenderablePipe, TemplateRefHolder } from '@fluent-form/core';
import { AnyObject } from '@ngify/types';
import { NzFormModule } from 'ng-zorro-antd/form';

@Directive()
export abstract class AbstractFormContentComponent extends TemplateRefHolder<{ form: FormGroup, model: AnyObject, schema: AbstractSchema, submit: EventEmitter<SubmitEvent> }> { }

@Component({
  standalone: true,
  imports: [
    NgTemplateOutlet,
    ReactiveFormsModule,
    NzFormModule,
    FluentGridModule,
    FluentFormItemOutletDirective,
    FluentBindingDirective,
    FluentReactivePipe,
    FluentControlPipe,
    FluentColumnPipe,
    RenderablePipe
  ],
  templateUrl: './form-content.component.html'
})
export class FormContentComponent extends AbstractFormContentComponent { }
