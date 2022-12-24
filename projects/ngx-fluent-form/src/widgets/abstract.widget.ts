import { TemplateRef } from '@angular/core';
import { AbstractControl, FormArray, FormControl } from '@angular/forms';
import { AnySchema } from '../schemas';
import { AnyArray, AnyObject } from '../types';

type Model<C extends AbstractControl> = C extends FormArray ? AnyArray : AnyObject;

export interface WidgetTemplateContext<S extends AnySchema, C extends AbstractControl = FormControl> {
  schema: S;
  control: C;
  model: Model<C>;
}

export abstract class AbstractWidget<C> {
  protected readonly contextGuard!: C;
  readonly abstract templateRef: TemplateRef<C>;
}
