import { TemplateRef } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormControlStatus, ValidatorFn } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import { NzDateMode } from 'ng-zorro-antd/date-picker';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { ComponentInputMap, ComponentOutputListenerMap, HTMLElementEventListenerMap, HTMLElementPropertyMap, SingleOrAll } from '../type';

/** 任意字段控件名称 */
export type AnySchemaName = SingleKeySchemaName | DoubleKeySchemaName;
/** 单字段图示名称 */
export type SingleKeySchemaName = string | number;
/** 双字段图示名称 */
export type DoubleKeySchemaName = readonly [string, string];

type Cell = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24;

/** @internal */
interface Label {
  value: string;
  span?: Cell;
  tooltip?: string | Tooltip;
}

/** @internal */
interface Tooltip {
  title: string | TemplateRef<void>;
  icon: string | NzFormTooltipIcon;
}

export interface CallbackArg<S> {
  schema: S;
  /** 如果当前没有对应的 control，会返回上一级的 control，这时候一般是 form group/array */
  control: AbstractControl;
  model: SafeAny;
}

/** 抽象图示 */
export interface AbstractSchema<Name extends AnySchemaName> {
  type: string;
  name?: Name;
  span?: Cell;
  offset?: Cell;
  flex?: number | string;
  label?: string | Label;
  hidden?: boolean | ((arg: CallbackArg<AbstractSchema<AnySchemaName>>) => boolean) | string;
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
  required?: boolean | ((arg: CallbackArg<AbstractSchema<AnySchemaName>>) => boolean) | string;
  /** Whether to disable control */
  disabled?: boolean | ((arg: CallbackArg<AbstractSchema<AnySchemaName>>) => boolean) | string;
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

/** @internal */
interface ControlChangeListenerMap<Val> {
  valueChange?: (value: Val) => void;
  statusChange?: (status: FormControlStatus) => void;
}

/** 抽象的组件图示 */
export interface AbstractComponentSchema<Cmp> {
  listener?: ComponentOutputListenerMap<Cmp>;
  property?: ComponentInputMap<Cmp>;
}

/** 抽象的元素图示 */
export interface AbstractElementSchema<Ele extends HTMLElement> {
  listener?: HTMLElementEventListenerMap;
  property?: HTMLElementPropertyMap<Ele>;
}

/** 抽象的组件控件图示 */
export interface AbstractComponentControlSchema<Cmp, Val> extends AbstractComponentSchema<Cmp> {
  listener?: ComponentOutputListenerMap<Cmp> & ControlChangeListenerMap<Val>;
}

/** 抽象的元素控件图示 */
export interface AbstractElementControlSchema<Ele extends HTMLElement, Val> extends AbstractElementSchema<Ele> {
  listener?: HTMLElementEventListenerMap & ControlChangeListenerMap<Val>;
}

/** 抽象的文本控件图示 */
export interface AbstractTextControlSchema<Name extends AnySchemaName, Val> extends AbstractControlSchema<Name, Val> {
  length?: number | SingleOrAll<{ max: number, min: number }>;
}

/** 抽象的日期控件图示 */
export interface AbstractDateControlSchema<Name extends AnySchemaName, Val> extends AbstractControlSchema<Name, Val> {
  /** Mode of date picker control */
  mode?: NzDateMode;
  /** Show clean button */
  clear?: boolean;
  /** Show time picker in date picker */
  time?: boolean;
  /** Date display format */
  format?: string;
  /** Inline mode */
  inline?: boolean;
}