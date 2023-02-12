import { NgClass, NgStyle } from '@angular/common';
import { TemplateRef } from '@angular/core';
import { AbstractControlOptions, AsyncValidatorFn, FormControl, ValidatorFn } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import { AutocompleteDataSource } from 'ng-zorro-antd/auto-complete';
import { CompareWith } from 'ng-zorro-antd/core/types';
import { NzDateMode } from 'ng-zorro-antd/date-picker';
import { NzPlacement } from 'ng-zorro-antd/date-picker/date-picker.component';
import { AnyBuilder, AnySchema } from './index.schema';
import { AbstractInputField, CallbackArgs, Col, ControlEventListener, ControlValueMapper, Labelful } from './interfaces';
import { AnySchemaName, Cell } from './types';

/** 抽象图示 */
export interface AbstractSchema<Name extends AnySchemaName> {
  kind: string;
  name?: Name;
  col?: Col | Cell;
  hidden?: boolean | ((args: CallbackArgs<AbstractSchema<AnySchemaName>>) => boolean) | string;
  class?: NgClass['ngClass'];
  style?: NgStyle['ngStyle'];
}

/** 抽象的真实控件图示 */
export interface AbstractControlSchema<Name extends AnySchemaName, Val> extends AbstractSchema<Name>, Labelful {
  id?: string;
  /** I/O mapper for control */
  mapper?: ControlValueMapper<Val>;
  defaultValue?: SafeAny;
  /** Is it a required control */
  required?: boolean | ((args: CallbackArgs<AbstractControlSchema<AnySchemaName, Val>>) => boolean) | string;
  /** Whether to disable control */
  disabled?: boolean | ((args: CallbackArgs<AbstractControlSchema<AnySchemaName, Val>>) => boolean) | string;
  feedback?: boolean;
  /** Error message for control */
  tips?: {
    success?: string | TemplateRef<{ $implicit: FormControl<Val> }>;
    warning?: string | TemplateRef<{ $implicit: FormControl<Val> }>;
    error?: string | TemplateRef<{ $implicit: FormControl<Val> }>;
    validating?: string | TemplateRef<{ $implicit: FormControl<Val> }>;
    extra?: string | TemplateRef<void>;
    auto?: Record<'default' | (string & {}), Record<string, string>>;
  };
  /** Validator for the control */
  validators?: ValidatorFn[];
  /** Async validators for control */
  asyncValidators?: AsyncValidatorFn[];
  updateOn?: AbstractControlOptions['updateOn'];
}

/** 抽象的容器控件图示 */
export interface AbstractControlContainerSchema<Name extends AnySchemaName> extends AbstractSchema<Name>, ControlEventListener<SafeAny> {
  label?: string;
  schemas: (AnySchema | AnyBuilder)[];
  /** Validator for the control */
  validators?: ValidatorFn[];
  /** Async validators for control */
  asyncValidators?: AsyncValidatorFn[];
  updateOn?: AbstractControlOptions['updateOn'];
}

/** 抽象的文本控件图示 */
export interface AbstractTextControlSchema<Name extends AnySchemaName, Val = string> extends AbstractControlSchema<Name, Val>, AbstractInputField {
  length?: number | { max?: number, min?: number };
  autocomplete?: {
    backfill?: boolean;
    options: AutocompleteDataSource;
    width?: number;
    compare?: CompareWith;
  };
}

/** 抽象的日期控件图示 */
export interface AbstractDateControlSchema<Name extends AnySchemaName, Val> extends AbstractControlSchema<Name, Val> {
  /** Mode of date picker control */
  mode?: NzDateMode;
  /** Show clean button */
  clearable?: boolean;
  /** Show time picker in date picker */
  time?: boolean;
  /** Date display format */
  format?: string;
  /** Inline mode */
  inline?: boolean;
  backdrop?: boolean;
  placement?: NzPlacement;
  today?: boolean;
  now?: boolean;
  suffixIcon?: string | TemplateRef<void>;
}
