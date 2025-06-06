import { Directive } from '@angular/core';
import type { AbstractControl } from '@angular/forms';
import type { AnyObject } from '@ngify/core';
import { TemplateRefHolder } from '../../directives';
import type { AbstractSchema } from '../../schemas';

export interface FormItemContentContext {
  control: AbstractControl;
  model: AnyObject;
  schema: AbstractSchema;
}

@Directive()
export abstract class AbstractFormItemContentComponent extends TemplateRefHolder<FormItemContentContext> { }
