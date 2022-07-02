import { TemplateRef } from '@angular/core';
import { Property } from '@ngify/types';
import { NzCascaderComponent, NzCascaderOption } from 'ng-zorro-antd/cascader';
import { NzCheckboxGroupComponent } from 'ng-zorro-antd/checkbox';
import { NzDateMode, NzDatePickerComponent, NzRangePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
import { NzRadioGroupComponent } from 'ng-zorro-antd/radio';
import { NzRateComponent } from 'ng-zorro-antd/rate';
import { NzSelectComponent, NzSelectModeType } from 'ng-zorro-antd/select';
import { NzSliderComponent } from 'ng-zorro-antd/slider';
import { NzSwitchComponent } from 'ng-zorro-antd/switch';
import { NzTimePickerComponent } from 'ng-zorro-antd/time-picker';
import { ComponentEventListenerMap, ComponentInput, HTMLElementEventListenerMap } from '../fluent-form.type';
import { AbstractControlSchema, AnySchemaName, SingleKeySchemaName } from './abstract.schema';

export interface InputControlSchema<N extends SingleKeySchemaName = SingleKeySchemaName> extends AbstractControlSchema<N> {
  type: 'input';
  subtype?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'color';
  /** Placeholder text */
  placeholder?: string;
  /** event listeners */
  listener?: HTMLElementEventListenerMap;
  /** Other properties that need to be bound */
  property?: Partial<Property<HTMLInputElement>>;
}

export interface TextareaControlSchema<N extends SingleKeySchemaName = SingleKeySchemaName> extends AbstractControlSchema<N> {
  type: 'textarea';
  /** Placeholder text */
  placeholder?: string;
  /** The number of lines in the text field */
  rows?: number;
  /** Whether to adapt the content height */
  autosize?: boolean | { minRows: number, maxRows: number };
  /** event listeners */
  listener?: HTMLElementEventListenerMap;
  /** Other properties that need to be bound */
  property?: Partial<Property<HTMLTextAreaElement>>;
}

export interface NumberInputControlSchema<N extends SingleKeySchemaName = SingleKeySchemaName> extends AbstractControlSchema<N> {
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
  /** event listeners */
  listener?: ComponentEventListenerMap<NzInputNumberComponent>;
  /** Other properties that need to be bound */
  property?: ComponentInput<NzInputNumberComponent>;
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

export interface DatePickerControlSchema<N extends SingleKeySchemaName = SingleKeySchemaName> extends AbstractControlSchema<N>, AbstractDateControlSchema {
  type: 'date';
  /** Placeholder text */
  placeholder?: string;
  /** event listeners */
  listener?: ComponentEventListenerMap<NzDatePickerComponent>;
  /** Other properties that need to be bound */
  property?: ComponentInput<NzDatePickerComponent>;
}

export interface RangePickerControlSchema<N extends AnySchemaName = AnySchemaName> extends AbstractControlSchema<N>, AbstractDateControlSchema {
  type: 'range';
  /** Placeholder text */
  placeholder?: [string, string];
  /** event listeners */
  listener?: ComponentEventListenerMap<NzRangePickerComponent>;
  /** Other properties that need to be bound */
  property?: ComponentInput<NzRangePickerComponent>;
}

export interface TimePickerControlSchema<N extends SingleKeySchemaName = SingleKeySchemaName> extends AbstractControlSchema<N> {
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
  /** event listeners */
  listener?: ComponentEventListenerMap<NzTimePickerComponent>;
  /** Other properties that need to be bound */
  property?: ComponentInput<NzTimePickerComponent>;
}

export interface SwitchControlSchema<N extends SingleKeySchemaName = SingleKeySchemaName> extends AbstractControlSchema<N> {
  type: 'switch';
  /** Placeholder text */
  placeholder?: [string | TemplateRef<void>, string | TemplateRef<void>];
  /** event listeners */
  listener?: ComponentEventListenerMap<NzSwitchComponent>;
  /** Other properties that need to be bound */
  property?: ComponentInput<NzSwitchComponent>;
}

export interface SelectControlSchema<N extends SingleKeySchemaName = SingleKeySchemaName> extends AbstractControlSchema<N> {
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
  };
  /** event listeners */
  listener?: ComponentEventListenerMap<NzSelectComponent>;
  /** Other properties that need to be bound */
  property?: ComponentInput<NzSelectComponent>;
}

export interface CascaderControlSchema<N extends SingleKeySchemaName = SingleKeySchemaName> extends AbstractControlSchema<N> {
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
  /** event listeners */
  listener?: ComponentEventListenerMap<NzCascaderComponent>;
  /** Other properties that need to be bound */
  property?: ComponentInput<NzCascaderComponent>;
}

export interface SliderControlSchema<N extends AnySchemaName = AnySchemaName> extends AbstractControlSchema<N> {
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
  /** event listeners */
  listener?: ComponentEventListenerMap<NzSliderComponent>;
  /** Other properties that need to be bound */
  property?: ComponentInput<NzSliderComponent>;
}

export interface RadioControlSchema<N extends SingleKeySchemaName = SingleKeySchemaName> extends AbstractControlSchema<N> {
  type: 'radio';
  /** Radio control style */
  style?: 'outline' | 'solid';
  options: Record<string, unknown>[];
  config?: {
    labelProperty?: string;
    valueProperty?: string;
  };
  /** event listeners */
  listener?: ComponentEventListenerMap<NzRadioGroupComponent>;
  /** Other properties that need to be bound */
  property?: ComponentInput<NzRadioGroupComponent>;
}

export interface CheckboxControlSchema<N extends SingleKeySchemaName = SingleKeySchemaName> extends AbstractControlSchema<N> {
  type: 'checkbox';
  options: Record<string, unknown>[];
  config?: {
    labelProperty?: string;
    valueProperty?: string;
  };
  /** event listeners */
  listener?: ComponentEventListenerMap<NzCheckboxGroupComponent>;
  /** Other properties that need to be bound */
  property?: ComponentInput<NzCheckboxGroupComponent>;
}

export interface RateControlSchema<N extends SingleKeySchemaName = SingleKeySchemaName> extends AbstractControlSchema<N> {
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
  /** event listeners */
  listener?: ComponentEventListenerMap<NzRateComponent>;
  /** Other properties that need to be bound */
  property?: ComponentInput<NzRateComponent>;
}