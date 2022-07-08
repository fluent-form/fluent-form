import { TemplateRef } from '@angular/core';
import { SafeAny } from '@ngify/types';
import { NzCascaderComponent, NzCascaderOption } from 'ng-zorro-antd/cascader';
import { NzCheckboxComponent, NzCheckboxGroupComponent } from 'ng-zorro-antd/checkbox';
import { NzDateMode, NzDatePickerComponent, NzRangePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
import { NzRadioGroupComponent } from 'ng-zorro-antd/radio';
import { NzRateComponent } from 'ng-zorro-antd/rate';
import { NzSelectComponent, NzSelectModeType } from 'ng-zorro-antd/select';
import { NzSliderComponent } from 'ng-zorro-antd/slider';
import { NzSwitchComponent } from 'ng-zorro-antd/switch';
import { NzTimePickerComponent } from 'ng-zorro-antd/time-picker';
import { AbstractComponentControlSchema, AbstractControlSchema, AbstractElementControlSchema, AbstractSchema, AnySchemaName, SingleKeySchemaName } from './abstract.schema';
import { AnyBuilder, AnySchema, FormBuilder, FormSchema, SingleKeyControlBuilder, SingleKeyControlSchema } from './index.schema';

export interface FormGroupSchema<N extends SingleKeySchemaName = SingleKeySchemaName> extends AbstractSchema<N> {
  type: 'group';
  schemas: (AnySchema | AnyBuilder)[];
}

export interface FormArraySchema<N extends SingleKeySchemaName = SingleKeySchemaName> extends AbstractSchema<N> {
  type: 'array';
  schemas: (SingleKeyControlSchema<number> | SingleKeyControlBuilder<number> | FormSchema<number> | FormBuilder<number>)[];
}

export interface InputControlSchema<Name extends SingleKeySchemaName = SingleKeySchemaName, Val = string> extends AbstractControlSchema<Name, Val>, AbstractElementControlSchema<HTMLInputElement, Val> {
  type: 'input';
  subtype?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'color';
  /** Placeholder text */
  placeholder?: string;
}

export interface TextareaControlSchema<Name extends SingleKeySchemaName = SingleKeySchemaName, Val = string> extends AbstractControlSchema<Name, Val>, AbstractElementControlSchema<HTMLTextAreaElement, Val> {
  type: 'textarea';
  /** Placeholder text */
  placeholder?: string;
  /** The number of lines in the text field */
  rows?: number;
  /** Whether to adapt the content height */
  autosize?: boolean | { minRows: number, maxRows: number };
}

export interface NumberInputControlSchema<Name extends SingleKeySchemaName = SingleKeySchemaName, Val = number> extends AbstractControlSchema<Name, Val>, AbstractComponentControlSchema<NzInputNumberComponent, Val> {
  type: 'number';
  /** Placeholder text */
  placeholder?: string;
  /** Maximum value */
  max?: number;
  /** Minimum value */
  min?: number;
  /** Decimal precision */
  precision?: number;
  /** Decimal precision mode */
  precisionMode?: NzInputNumberComponent['nzPrecisionMode'];
  /** Step length */
  step?: number;
}

interface AbstractDateControlSchema {
  /** Mode of date picker control */
  mode?: NzDateMode;
  /** Show clean button */
  clear?: boolean;
  /** Show time picker in date picker */
  showTime?: boolean;
  /** Date display format */
  format?: string;
  /** Inline mode */
  inline?: boolean;
}

export interface DatePickerControlSchema<Name extends SingleKeySchemaName = SingleKeySchemaName, Val = Date> extends AbstractControlSchema<Name, Val>, AbstractComponentControlSchema<NzDatePickerComponent, Val>, AbstractDateControlSchema {
  type: 'date';
  /** Placeholder text */
  placeholder?: string;
}

export interface RangePickerControlSchema<Name extends AnySchemaName = AnySchemaName, Val = [Date, Date]> extends AbstractControlSchema<Name, Val>, AbstractComponentControlSchema<NzRangePickerComponent, Val>, AbstractDateControlSchema {
  type: 'range';
  /** Placeholder text */
  placeholder?: [string, string];
}

export interface TimePickerControlSchema<Name extends SingleKeySchemaName = SingleKeySchemaName, Val = Date> extends AbstractControlSchema<Name, Val>, AbstractComponentControlSchema<NzTimePickerComponent, Val> {
  type: 'time';
  /** Placeholder text */
  placeholder?: string;
  /** Show clean button */
  clear?: boolean;
  /** Time display format */
  format?: string;
  /** Time step length */
  step?: {
    hour?: number;
    minute?: number;
    second?: number;
  };
}

export interface SwitchControlSchema<Name extends SingleKeySchemaName = SingleKeySchemaName, Val = boolean> extends AbstractControlSchema<Name, Val>, AbstractComponentControlSchema<NzSwitchComponent, Val> {
  type: 'switch';
  /** Placeholder text */
  placeholder?: [string | TemplateRef<void>, string | TemplateRef<void>];
}

export interface SelectControlSchema<Name extends SingleKeySchemaName = SingleKeySchemaName, Val = SafeAny | SafeAny[]> extends AbstractControlSchema<Name, Val>, AbstractComponentControlSchema<NzSelectComponent, Val> {
  type: 'select';
  /** Placeholder text */
  placeholder?: string;
  /** Show clean button */
  clear?: boolean;
  /** Mode of select control */
  mode?: NzSelectModeType;
  /** Max selected */
  limit?: number;
  /** Support search */
  search?: boolean;
  options: Record<string, unknown>[];
  config?: {
    labelProperty?: string;
    valueProperty?: string;
    disabledProperty?: string;
  };
}

export interface CascaderControlSchema<Name extends SingleKeySchemaName = SingleKeySchemaName, Val = SafeAny[]> extends AbstractControlSchema<Name, Val>, AbstractComponentControlSchema<NzCascaderComponent, Val> {
  type: 'cascader';
  /** Placeholder text */
  placeholder?: string;
  /** Show clean button */
  clear?: boolean;
  /** Expand trigger for cascader control */
  trigger?: NzCascaderComponent['nzExpandTrigger'];
  /** Support search, cannot be used with `options.load` */
  search?: boolean;
  options: NzCascaderOption[];
  config?: {
    labelProperty?: string;
    valueProperty?: string;
  };
}

export interface SliderControlSchema<Name extends AnySchemaName = AnySchemaName, Val = number | [number, number]> extends AbstractControlSchema<Name, Val>, AbstractComponentControlSchema<NzSliderComponent, Val> {
  type: 'slider';
  /** Placeholder text */
  placeholder?: never;
  /** Containment relationship */
  included?: boolean;
  /** Maximum value */
  max?: number;
  /** Minimum value */
  min?: number;
  /** Range slider mode */
  range?: boolean;
  /** Step length */
  step?: number;
}

export interface RadioControlSchema<Name extends SingleKeySchemaName = SingleKeySchemaName, Val = SafeAny> extends AbstractControlSchema<Name, Val>, AbstractComponentControlSchema<NzRadioGroupComponent, Val> {
  type: 'radio';
  /** Radio control style */
  style?: 'outline' | 'solid';
  options: Record<string, unknown>[];
  config?: {
    labelProperty?: string;
    valueProperty?: string;
  };
}

export interface CheckboxControlSchema<Name extends SingleKeySchemaName = SingleKeySchemaName, Val = boolean> extends AbstractControlSchema<Name, Val>, AbstractComponentControlSchema<NzCheckboxComponent, Val> {
  type: 'checkbox';
  content?: string;
  autoFocus?: boolean;
  indeterminate?: boolean;
}

export interface CheckboxGroupControlSchema<Name extends SingleKeySchemaName = SingleKeySchemaName, Val = SafeAny> extends AbstractControlSchema<Name, Val>, AbstractComponentControlSchema<NzCheckboxGroupComponent, Val> {
  type: 'checkbox-group';
  options: Record<string, unknown>[];
  config?: {
    labelProperty?: string;
    valueProperty?: string;
  };
}

export interface RateControlSchema<Name extends SingleKeySchemaName = SingleKeySchemaName, Val = number> extends AbstractControlSchema<Name, Val>, AbstractComponentControlSchema<NzRateComponent, Val> {
  type: 'rate';
  /** Show clean button */
  clear?: boolean;
  /** whether to allow semi selection */
  half?: boolean;
  /** star count */
  count?: number;
  /** custom character of rate */
  character?: TemplateRef<void>;
  /** Customize tooltip by each character */
  tooltips?: string[];
}