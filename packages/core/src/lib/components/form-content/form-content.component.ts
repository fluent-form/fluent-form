import { Directive } from '@angular/core';
import type { FormGroup } from '@angular/forms';
import type { AnyObject } from '@ngify/types';
import { TemplateRefHolder } from '../../directives';
import type { AbstractSchema } from '../../schemas';

export interface FormContentTemplateContext {
  form: FormGroup;
  model: AnyObject;
  schema: AbstractSchema;
  onSubmit: (event: SubmitEvent) => boolean;
}

@Directive()
export abstract class AbstractFormContentComponent extends TemplateRefHolder<FormContentTemplateContext> { }
