import { TemplateRef } from '@angular/core';
import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
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
import { Builder } from '../utils/builder.utils';

/** 任意字段控件名称 */
export type AnySchemaName = SingleKeySchemaName | DoubleKeySchemaName;
/** 单字段图示名称 */
export type SingleKeySchemaName = number | string;
/** 双字段图示名称 */
export type DoubleKeySchemaName = readonly [string, string];

/** 任意图示 */
export type AnySchema = FormSchema | RealControlSchema | ComponentSchema;
/** 任意构建器 */
export type AnyBuilder = Builder<AnySchema, AnySchema, {}>;

/** 控件图示 */
export type AnyControlSchema = FormSchema | RealControlSchema;
/** 控件构建器 */
export type AnyControlBuilder = Builder<AnyControlSchema, AnyControlSchema, {}>;

/** 容器图示 */
export type ContainerSchema = FormSchema | InputGroupComponentSchema;
/** 容器构建器 */
export type ContainerBuilder = FormSchema | InputGroupComponentSchema;

/** 表单图示 */
export type FormSchema = FormGroupSchema | FormArraySchema;
/** 表单构建器 */
export type FormBuilder = Builder<FormSchema, FormSchema, {}>;

/** 真实控件图示 */
export type RealControlSchema = SingleKeyRealControlSchema | DoubleKeyRealControlSchema;
/** 真实控件构建器 */
export type RealControlBuilder = Builder<RealControlSchema, RealControlSchema, {}>;

/** 普通组件图示 */
export type ComponentSchema = InputGroupComponentSchema;
/** 普通组件构建器 */
export type ComponentBuilder = Builder<ComponentSchema, ComponentSchema, {}>;

/** 输入系列控件图示 */
export type InputSeriesControlSchema =
  InputControlSchema |
  TextareaControlSchema |
  NumberInputControlSchema |
  DatePickerControlSchema |
  TimePickerControlSchema |
  RangePickerControlSchema |
  SelectControlSchema |
  CascaderControlSchema;
/** 输入系列控件构建器 */
export type InputSeriesControlBuilder = Builder<InputSeriesControlSchema, InputSeriesControlSchema, {}>;

/** 单字段的真实控件图示 */
export type SingleKeyRealControlSchema =
  InputControlSchema |
  TextareaControlSchema |
  NumberInputControlSchema |
  DatePickerControlSchema |
  TimePickerControlSchema |
  SwitchControlSchema |
  SelectControlSchema |
  CascaderControlSchema |
  RadioControlSchema |
  CheckboxControlSchema |
  RateControlSchema;
/** 双字段的真实控件图示 */
export type DoubleKeyRealControlSchema = RangePickerControlSchema | SliderControlSchema;

/** 抽象图示 */
interface AbstractSchema<N extends AnySchemaName> {
  /** Type of control */
  type: string;
  /** Field name for control */
  name: N;
  /** Span of the control in grid layout */
  span?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24;
  /** Label for control */
  label?: string;
}

/** 抽象的容器图示（可容纳子图示的图示） */
interface AbstractContainerSchema<S extends AnySchema | AnyBuilder> {
  schemas: S[];
}

/** 抽象的真实控件图示 */
interface AbstractRealControlSchema<N extends AnySchemaName, Value = any> extends AbstractSchema<N> {
  /** I/O mapper for control */
  mapper?: {
    /** An input mapper that maps from a model's value to a form control's value */
    input: (value?: SafeAny) => SafeAny,
    /** An output mapper that maps from a form control's value to a model's value */
    output: (value?: SafeAny) => SafeAny,
  };
  value?: Value;
  /** Is it a required control */
  required?: boolean;
  /** Whether to disable control */
  disabled?: boolean;
  /** Error message for control */
  errorTip?: string;
  /** Validator for the control */
  validator?: ValidatorFn[];
  /** Async validators for control */
  asyncValidator?: AsyncValidatorFn[];
}

export interface FormGroupSchema extends AbstractSchema<SingleKeySchemaName>, AbstractContainerSchema<AnySchema | AnyBuilder> {
  type: 'group';
}

export interface FormArraySchema extends AbstractSchema<SingleKeySchemaName>, AbstractContainerSchema<AnyControlSchema | AnyControlBuilder> {
  type: 'array';
}

export interface InputControlSchema extends AbstractRealControlSchema<SingleKeySchemaName> {
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

export interface TextareaControlSchema extends AbstractRealControlSchema<SingleKeySchemaName> {
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

export interface NumberInputControlSchema extends AbstractRealControlSchema<SingleKeySchemaName> {
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

export interface DatePickerControlSchema extends AbstractRealControlSchema<SingleKeySchemaName>, AbstractDateControlSchema {
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

export interface RangePickerControlSchema extends AbstractRealControlSchema<AnySchemaName>, AbstractDateControlSchema {
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

export interface TimePickerControlSchema extends AbstractRealControlSchema<SingleKeySchemaName> {
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

export interface SwitchControlSchema extends AbstractRealControlSchema<SingleKeySchemaName> {
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

export interface SelectControlSchema extends AbstractRealControlSchema<SingleKeySchemaName> {
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

export interface CascaderControlSchema extends AbstractRealControlSchema<SingleKeySchemaName> {
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

export interface SliderControlSchema extends AbstractRealControlSchema<AnySchemaName> {
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

export interface RadioControlSchema extends AbstractRealControlSchema<SingleKeySchemaName> {
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

export interface CheckboxControlSchema extends AbstractRealControlSchema<SingleKeySchemaName> {
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

export interface RateControlSchema extends AbstractRealControlSchema<SingleKeySchemaName> {
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

export interface InputGroupComponentSchema extends AbstractSchema<string>, AbstractContainerSchema<InputSeriesControlSchema | InputSeriesControlBuilder> {
  type: 'input-group',
  required?: boolean;
  /** The pre-label of the input box */
  before?: {
    icon?: string,
    template?: string | TemplateRef<void>
  };
  /** The back label of the input box */
  after?: {
    icon?: string,
    template?: string | TemplateRef<void>
  };
  /** The prefix of the input box */
  prefix?: string | TemplateRef<void>;
  /** The suffix of the input box */
  suffix?: string | TemplateRef<void>;
}
