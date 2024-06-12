import { Directive } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { AnyObject } from '@ngify/types';
import { TemplateRefHolder } from '../directives';
import { AbstractSchema } from '../schemas';

export interface WidgetTemplateContext<S extends AbstractSchema, C extends AbstractControl = FormControl> {
  schema: S;
  control: C;
  model: AnyObject;
}

@Directive()
export abstract class AbstractWidget<C> extends TemplateRefHolder<C> {
  protected readonly contextGuard!: C;
}
