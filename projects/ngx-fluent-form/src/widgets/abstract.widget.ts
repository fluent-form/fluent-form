import { Directive, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { NzInputGroupComponent } from 'ng-zorro-antd/input';
import { AbstractTextControlSchema, AnySchema } from '../schemas';
import { Model } from '../types';
import { isNumber } from '../utils';

export interface WidgetTemplateContext<S extends AnySchema, C extends AbstractControl = FormControl> {
  schema: S;
  control: C;
  model: Model<C>;
}

@Directive()
export abstract class AbstractWidget<C> {
  protected readonly contextGuard!: C;
  @ViewChild(TemplateRef, { static: true }) templateRef!: TemplateRef<C>;
}

export abstract class AbstractTextControlWidget<C> extends AbstractWidget<C> {
  protected readonly NzInputGroup = NzInputGroupComponent;
  protected readonly helper = {
    length: {
      min: (length: AbstractTextControlSchema<string>['length']) => {
        return isNumber(length) ? length : length?.min;
      },
      max: (length: AbstractTextControlSchema<string>['length']) => {
        return isNumber(length) ? length : length?.max;
      },
    },
    autocomplete: {
      compare: (autocomplete: AbstractTextControlSchema<string>['autocomplete']) =>
        autocomplete?.compare ?? ((o1: unknown, o2: unknown) => o1 === o2)
    }
  } as const;
}
