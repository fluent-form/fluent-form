import { Directive, TemplateRef } from '@angular/core';
import type { AbstractControl } from '@angular/forms';
import type { AnyObject } from '@ngify/core';
import { TemplateRefHolder } from '../directives/template-ref-holder.directive';
import type { AbstractSchema } from '../schemas';

export interface WidgetWrapperContext {
  control: AbstractControl;
  model: AnyObject;
  schema: AbstractSchema;
  templateRef: TemplateRef<WidgetWrapperContext>;
  next?: WidgetWrapperContext;
}

@Directive()
export abstract class AbstractWidgetWrapper extends TemplateRefHolder<WidgetWrapperContext> { }
