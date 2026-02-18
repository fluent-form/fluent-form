import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Directive, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import type { AnyObject } from '@ngify/core';
import { FluentBindingDirective, FluentGridModule, FluentWidgetWrapperOutlet, TemplateRefHolder } from '../../../directives';
import { ClassPipe, FluentColumnPipe, FluentControlPipe, FluentReactivePipe, RenderablePipe, StylePipe } from '../../../pipes';
import type { AbstractSchema } from '../../../schemas';

@Directive()
export abstract class AbstractFormContentComponent
  extends TemplateRefHolder<{ form: FormGroup, model: AnyObject, schema: AbstractSchema, submit: EventEmitter<SubmitEvent> }> { }

@Component({
  imports: [
    NgTemplateOutlet,
    ReactiveFormsModule,
    FluentGridModule,
    FluentWidgetWrapperOutlet,
    FluentBindingDirective,
    FluentReactivePipe,
    FluentControlPipe,
    FluentColumnPipe,
    RenderablePipe,
    ClassPipe,
    StylePipe
  ],
  templateUrl: './form-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormContentComponent extends AbstractFormContentComponent { }
