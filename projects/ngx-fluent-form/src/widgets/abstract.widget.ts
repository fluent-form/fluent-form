import { Directive, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormControl } from '@angular/forms';
import { AbstractSchema, AbstractTextControlSchema, AnySchema } from '../schemas';
import { StandardSchema } from '../schemas/types';
import { AnyArray, AnyObject } from '../types';
import { isNumber } from '../utils';

type Model<C extends AbstractControl> = C extends FormArray ? AnyArray : AnyObject;

export interface WidgetTemplateContext<S extends AnySchema, C extends AbstractControl = FormControl> {
  schema: StandardSchema<S>;
  control: C;
  model: Model<C>;
}

@Directive()
export abstract class AbstractWidget<C> {
  protected readonly contextGuard!: C;
  @ViewChild(TemplateRef, { static: true }) templateRef!: TemplateRef<C>;
}

export abstract class AbstractTextControlWidget<C> extends AbstractWidget<C> {
  protected readonly helper = {
    col: COL_HELPER,
    length: {
      min: (length: AbstractTextControlSchema<string>['length']) =>
        isNumber(length) ? length : length?.min,
      max: (length: AbstractTextControlSchema<string>['length']) =>
        isNumber(length) ? length : length?.max,
    },
    autocomplete: {
      compare: (autocomplete: AbstractTextControlSchema<string>['autocomplete']) =>
        autocomplete?.compare ?? ((o1: unknown, o2: unknown) => o1 === o2)
    }
  } as const;
}

export const COL_HELPER = {
  span: (col: AbstractSchema<string>['col']) => isNumber(col) ? col : col?.span ?? null,
  flex: (col: AbstractSchema<string>['col']) => isNumber(col) || !col?.flex ? null : col.flex,
  offset: (col: AbstractSchema<string>['col']) => isNumber(col) || !col?.offset ? null : col.offset,
} as const;
