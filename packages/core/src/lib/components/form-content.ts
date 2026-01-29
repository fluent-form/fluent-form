import { Directive } from '@angular/core';
import type { FormGroup } from '@angular/forms';
import type { AnyObject } from '@ngify/core';
import { TemplateRefHolder } from '../directives/template-ref-holder.directive';
import type { AbstractSchema } from '../schemas';

export interface FormContentTemplateContext {
  form: FormGroup;
  model: AnyObject;
  schema: AbstractSchema;
  onSubmit: (event: SubmitEvent) => boolean;
}

@Directive()
export abstract class AbstractFormContentComponent extends TemplateRefHolder<FormContentTemplateContext> { }
