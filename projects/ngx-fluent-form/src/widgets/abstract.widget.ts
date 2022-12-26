import { TemplateRef } from '@angular/core';
import { AbstractControl, FormArray, FormControl } from '@angular/forms';
import { AbstractSchema, AnySchema } from '../schemas';
import { AnyArray, AnyObject } from '../types';
import { isNumber } from '../utils';

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

export const COL_HELPER = {
  span: (col: AbstractSchema<string>['col']) => isNumber(col) ? col : col?.span ?? null,
  flex: (col: AbstractSchema<string>['col']) => isNumber(col) || !col?.flex ? null : col.flex,
  offset: (col: AbstractSchema<string>['col']) => isNumber(col) || !col?.offset ? null : col.offset,
} as const;