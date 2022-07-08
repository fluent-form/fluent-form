import { TemplateRef } from '@angular/core';
import { AsyncValidatorFn, FormControl, FormControlStatus, ValidatorFn } from '@angular/forms';
import { Property, SafeAny } from '@ngify/types';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { ComponentInputMap, ComponentOutputListenerMap, HTMLElementEventListenerMap } from '../fluent-form.type';

/** 任意字段控件名称 */
export type AnySchemaName = SingleKeySchemaName | DoubleKeySchemaName;
/** 单字段图示名称 */
export type SingleKeySchemaName = string | number;
/** 双字段图示名称 */
export type DoubleKeySchemaName = readonly [string, string];

type Cell = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24;

interface Label {
  value: string;
  span?: Cell;
  tooltip?: string | Tooltip;
}

interface Tooltip {
  title: string | TemplateRef<void>;
  icon: string | NzFormTooltipIcon;
}

/** 抽象图示 */
export interface AbstractSchema<Name extends AnySchemaName> {
  /** Type of control */
  type: string;
  /** Field name for control */
  name?: Name;
  /** Span of the control in grid layout */
  span?: Cell;
  offset?: Cell;
  flex?: number | string;
  /** Label for control */
  label?: string | Label;
  hidden?: boolean;
}

/** 抽象的真实控件图示 */
export interface AbstractControlSchema<Name extends AnySchemaName, Val> extends AbstractSchema<Name> {
  id?: string;
  /** I/O mapper for control */
  mapper?: {
    /** An input mapper that maps from a model's value to a form control's value */
    input: (value?: SafeAny) => SafeAny,
    /** An output mapper that maps from a form control's value to a model's value */
    output: (value?: SafeAny) => SafeAny,
  };
  value?: Val;
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

interface ControlChangeListenerMap<Val> {
  valueChange?: (value: Val) => void;
  statusChange?: (status: FormControlStatus) => void;
}

/** 抽象的组件控件 */
export interface AbstractComponentControlSchema<Cmp, Val> {
  listener?: ComponentOutputListenerMap<Cmp> & ControlChangeListenerMap<Val>;
  property?: ComponentInputMap<Cmp>;
}

/** 抽象的元素控件 */
export interface AbstractElementControlSchema<Ele extends HTMLElement, Val> {
  listener?: HTMLElementEventListenerMap & ControlChangeListenerMap<Val>;
  property?: Partial<Property<Ele>>;
}