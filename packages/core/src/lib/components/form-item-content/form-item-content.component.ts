import { Directive } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { AnyObject } from '@ngify/types';
import { TemplateRefHolder } from '../../directives';
import { AbstractSchema } from '../../schemas';

export interface FormItemContentContext {
  control: AbstractControl;
  model: AnyObject;
  schema: AbstractSchema;
}

@Directive()
export abstract class AbstractFormItemContentComponent extends TemplateRefHolder<FormItemContentContext> { }
