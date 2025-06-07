import { NgTemplateOutlet } from '@angular/common';
import { Component, Directive, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import type { AnyObject } from '@ngify/core';
import { FluentBindingDirective, FluentFormItemOutletDirective, FluentGridModule, TemplateRefHolder } from '../../../directives';
import { FluentColumnPipe, FluentControlPipe, FluentReactivePipe, RenderablePipe } from '../../../pipes';
import type { AbstractSchema } from '../../../schemas';

@Directive()
export abstract class AbstractFormContentComponent
  extends TemplateRefHolder<{ form: FormGroup, model: AnyObject, schema: AbstractSchema, submit: EventEmitter<SubmitEvent> }> { }

@Component({
  imports: [
    NgTemplateOutlet,
    ReactiveFormsModule,
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
