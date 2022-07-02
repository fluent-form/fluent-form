import { TemplateRef } from '@angular/core';
import { Property, SafeAny } from '@ngify/types';
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
  /** Control value change callback */
  change?: (value: string, schema: InputControlSchema) => void;
  /** event listeners */
  listener?: HTMLElementEventListenerMap<InputControlSchema>;
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
  /** Control value change callback */
  change?: (value: string, schema: TextareaControlSchema) => void;
  /** event listeners */
  listener?: HTMLElementEventListenerMap<TextareaControlSchema>;
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
  /** Control value change callback */
  change?: (value: number, schema: NumberInputControlSchema) => void;
  /** event listeners */
  listener?: ComponentEventListenerMap<NzInputNumberComponent, NumberInputControlSchema>;
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
  /** Control value change callback */
  change?: (value: Date, schema: DatePickerControlSchema) => void;
  /** event listeners */
  listener?: ComponentEventListenerMap<NzDatePickerComponent, DatePickerControlSchema>;
  /** Other properties that need to be bound */
  property?: ComponentInput<NzDatePickerComponent>;
}

export interface RangePickerControlSchema<N extends AnySchemaName = AnySchemaName> extends AbstractControlSchema<N>, AbstractDateControlSchema {
  type: 'range';
  /** Placeholder text */
  placeholder?: [string, string];
  /** Control value change callback */
  change?: (value: [Date, Date], schema: DatePickerControlSchema) => void;
  /** event listeners */
  listener?: ComponentEventListenerMap<NzRangePickerComponent, RangePickerControlSchema>;
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
  /** Control value change callback */
  change?: (value: Date, schema: TimePickerControlSchema) => void;
  /** event listeners */
  listener?: ComponentEventListenerMap<NzTimePickerComponent, TimePickerControlSchema>;
  /** Other properties that need to be bound */
  property?: ComponentInput<NzTimePickerComponent>;
}

export interface SwitchControlSchema<N extends SingleKeySchemaName = SingleKeySchemaName> extends AbstractControlSchema<N> {
  type: 'switch';
  /** Placeholder text */
  placeholder?: [string | TemplateRef<void>, string | TemplateRef<void>];
  /** Control value change callback */
  change?: (value: boolean, schema: SwitchControlSchema) => void;
  /** event listeners */
  listener?: ComponentEventListenerMap<NzSwitchComponent, SwitchControlSchema>;
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
  /** Control value change callback */
  change?: (value: SafeAny | SafeAny[], schema: SelectControlSchema) => void;
  /** event listeners */
  listener?: ComponentEventListenerMap<NzSelectComponent, SelectControlSchema>;
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
  /** Control value change callback */
  change?: (value: SafeAny[], schema: CascaderControlSchema) => void;
  /** event listeners */
  listener?: ComponentEventListenerMap<NzCascaderComponent, CascaderControlSchema>;
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
  /** Control value change callback */
  change?: (value: number | number[], schema: SliderControlSchema) => void;
  /** event listeners */
  listener?: ComponentEventListenerMap<NzSliderComponent, SliderControlSchema>;
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
  /** Control value change callback */
  change?: (value: SafeAny, schema: RadioControlSchema) => void;
  /** event listeners */
  listener?: ComponentEventListenerMap<NzRadioGroupComponent, RadioControlSchema>;
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
  /** Control value change callback */
  change?: (value: SafeAny[], schema: CheckboxControlSchema) => void;
  /** event listeners */
  listener?: ComponentEventListenerMap<NzCheckboxGroupComponent, CheckboxControlSchema>;
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
  /** Control value change callback */
  change?: (value: number, schema: RateControlSchema) => void;
  /** event listeners */
  listener?: ComponentEventListenerMap<NzRateComponent, RateControlSchema>;
  /** Other properties that need to be bound */
  property?: ComponentInput<NzRateComponent>;
}