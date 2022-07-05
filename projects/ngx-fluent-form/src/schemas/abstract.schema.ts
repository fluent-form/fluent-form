import { TemplateRef } from '@angular/core';
import { AsyncValidatorFn, FormControl, ValidatorFn } from '@angular/forms';
import { SafeAny } from '@ngify/types';

/** 任意字段控件名称 */
export type AnySchemaName = SingleKeySchemaName | DoubleKeySchemaName;
/** 单字段图示名称 */
export type SingleKeySchemaName = string | number;
/** 双字段图示名称 */
export type DoubleKeySchemaName = readonly [string, string];

/** 抽象图示 */
export interface AbstractSchema<N extends AnySchemaName> {
  /** Type of control */
  type: string;
  /** Field name for control */
  name?: N;
  /** Span of the control in grid layout */
  span?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24;
  /** Label for control */
  label?: string;
  hidden?: boolean;
}

/** 抽象的真实控件图示 */
export interface AbstractControlSchema<N extends AnySchemaName, V> extends AbstractSchema<N> {
  /** I/O mapper for control */
  mapper?: {
    /** An input mapper that maps from a model's value to a form control's value */
    input: (value?: SafeAny) => SafeAny,
    /** An output mapper that maps from a form control's value to a model's value */
    output: (value?: SafeAny) => SafeAny,
  };
  value?: V;
  /** Is it a required control */
  required?: boolean;
  /** Whether to disable control */
  disabled?: boolean;
  feedback?: boolean;
  /** Error message for control */
  tips?: {
    success?: string | TemplateRef<{ $implicit: FormControl }>;
    warning?: string | TemplateRef<{ $implicit: FormControl }>;
    error?: string | TemplateRef<{ $implicit: FormControl }>;
    validating?: string | TemplateRef<{ $implicit: FormControl }>;
    extra?: string | TemplateRef<void>;
    auto?: Record<'default' | (string & {}), Record<string, string>>;
  };
  /** Validator for the control */
  validator?: ValidatorFn[];
  /** Async validators for control */
  asyncValidator?: AsyncValidatorFn[];
}