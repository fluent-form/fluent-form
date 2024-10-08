import { Directive } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AnyObject } from '@ngify/types';
import { TemplateRefHolder } from '../../directives';
import { AbstractSchema } from '../../schemas';

export interface FormContentTemplateContext {
  form: FormGroup;
  model: AnyObject;
  schema: AbstractSchema;
  onSubmit: (event: SubmitEvent) => boolean
}

@Directive()
export abstract class AbstractFormContentComponent extends TemplateRefHolder<FormContentTemplateContext> { }
