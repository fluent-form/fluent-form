import { Directive, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormControl } from '@angular/forms';
import { AnyArray, AnyObject } from '@ngify/types';
import { NzFormNoStatusService } from 'ng-zorro-antd/core/form';
import { AbstractTextControlSchema, AnySchema } from '../schemas';
import { StandardSchema } from '../schemas/types';
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
  protected readonly NzFormNoStatusService = NzFormNoStatusService;
  protected readonly helper = {
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
