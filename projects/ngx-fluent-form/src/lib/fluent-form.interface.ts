import { TemplateRef } from '@angular/core';
import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { NzCascaderComponent, NzCascaderOption } from 'ng-zorro-antd/cascader';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
import { NzSelectComponent } from 'ng-zorro-antd/select';

export type AnyControlOptions =
  EmbeddedFormOptions
  | InputControlOptions
  | TextareaControlOptions
  | NumberInputControlOptions
  | DatePickerControlOptions
  | RangePickerControlOptions
  | TimePickerControlOptions
  | SwitchControlOptions
  | SelectControlOptions
  | CascaderControlOptions
  | SliderControlOptions
  | RadioControlOptions
  | CheckboxControlOptions;

export interface FormControlOptions {
  /** Type of control */
  type: string;
  /** Field name for control */
  name: string | [string, string];
  /** Span of the control in grid layout */
  span: number;
  /** Label for control */
  label?: string;
  /** I/O mapper for control */
  mapper?: {
    /** An input mapper that maps from a model's value to a form control's value */
    input: (value?: NzSafeAny) => NzSafeAny,
    /** An output mapper that maps from a form control's value to a model's value */
    output: (value?: NzSafeAny) => NzSafeAny,
  };
  /** Is it a required control */
  required?: boolean;
  /** Whether to disable control */
  disabled?: boolean;
  /** Error message for control */
  errorTip?: string;
  /** Validator for the control */
  validator?: ValidatorFn | ValidatorFn[];
  /** Async validators for control */
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[];
}

export interface EmbeddedFormOptions extends FormControlOptions {
  type: 'embed';
  name: string;
  /** Schema for embedded form */
  schema: AnyControlOptions[];
  // Disable the following properties
  /**
   * @ignore
   * @deprecated
   */
  mapper?: never;
  /**
   * @ignore
   * @deprecated
   */
  required?: never;
  /**
   * @ignore
   * @deprecated
   */
  disabled?: never;
  /**
   * @ignore
   * @deprecated
   */
  errorTip?: never;
  /**
   * @ignore
   * @deprecated
   */
  validators?: never;
  /**
   * @ignore
   * @deprecated
   */
  asyncValidator?: never;
}

export interface InputControlOptions extends FormControlOptions {
  type: 'text' | 'email' | 'password';
  name: string;
  /** Placeholder text */
  placeholder?: string;
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
  /** Control value change callback */
  change?: (value: string, options: InputControlOptions) => void;
}

export interface TextareaControlOptions extends FormControlOptions {
  type: 'textarea';
  name: string;
  /** Placeholder text */
  placeholder?: string;
  /** The number of lines in the text field */
  rows?: number;
  /** Whether to adapt the content height */
  autosize?: boolean | { minRows: number, maxRows: number };
  /** Control value change callback */
  change?: (value: string, options: TextareaControlOptions) => void;
}

export interface NumberInputControlOptions extends FormControlOptions {
  type: 'number';
  name: string;
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
  change?: (value: number, options: NumberInputControlOptions) => void;
}

interface DateControlOptions {
  /** Mode of date picker control */
  mode?: NzDatePickerComponent['nzMode'];
  /** Show clean button */
  clear?: boolean;
  /** Show time picker in date picker */
  showTime?: boolean;
  /** Date display format */
  format?: string;
  /** Inline mode */
  inline?: boolean;
}

export interface DatePickerControlOptions extends FormControlOptions, DateControlOptions {
  type: 'date';
  name: string;
  /** Placeholder text */
  placeholder?: string;
  /** Control value change callback */
  change?: (value: Date, options: DatePickerControlOptions) => void;
}

export interface RangePickerControlOptions extends FormControlOptions, DateControlOptions {
  type: 'range';
  name: string | [string, string];
  /** Placeholder text */
  placeholder?: [string, string];
  /** Control value change callback */
  change?: (value: [Date, Date], options: DatePickerControlOptions) => void;
}

export interface TimePickerControlOptions extends FormControlOptions {
  type: 'time';
  name: string;
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
  change?: (value: Date, options: TimePickerControlOptions) => void;
}

export interface SwitchControlOptions extends FormControlOptions {
  type: 'switch';
  name: string;
  /** Placeholder text */
  placeholder?: [string | TemplateRef<void>, string | TemplateRef<void>];
  /** Control value change callback */
  change?: (value: boolean, options: SwitchControlOptions) => void;
}

export interface SelectControlOptions extends FormControlOptions {
  type: 'select';
  name: string;
  /** Placeholder text */
  placeholder?: string;
  /** Show clean button */
  clear?: boolean;
  /** Mode of select control */
  mode?: NzSelectComponent['nzMode'];
  /** Max selected */
  limit?: number;
  /** Support search */
  search?: boolean;
  options: {
    /** Options data array */
    data: Record<string, NzSafeAny>,
    /** In the options object, the property name corresponding to the label */
    label?: string;
    /** In the options object, the property name corresponding to the value */
    value?: string;
  };
  /** Control value change callback */
  change?: (value: NzSafeAny | NzSafeAny[], options: SelectControlOptions) => void;
}

export interface CascaderControlOptions extends FormControlOptions {
  type: 'cascader';
  name: string;
  /** Placeholder text */
  placeholder?: string;
  /** Show clean button */
  clear?: boolean;
  /** Expand trigger for cascader control */
  trigger?: NzCascaderComponent['nzExpandTrigger'];
  /** Support search, cannot be used with `options.load` */
  search?: boolean;
  options: {
    /** Options data array */
    data?: NzCascaderOption[];
    /** Load options data asynchronously */
    load?: NzCascaderComponent['nzLoadData'];
    /** In the options object, the property name corresponding to the label */
    label?: string;
    /** In the options object, the property name corresponding to the value */
    value?: string;
  };
  /** Control value change callback */
  change?: (value: NzSafeAny[], options: CascaderControlOptions) => void;
}

export interface SliderControlOptions extends FormControlOptions {
  type: 'slider';
  name: string | [string, string];
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
  change?: (value: number | number[], options: SliderControlOptions) => void;
}

export interface RadioControlOptions extends FormControlOptions {
  type: 'radio';
  name: string;
  /** Radio control style */
  style?: 'outline' | 'solid';
  options: {
    /** Options data array */
    data: Record<string, NzSafeAny>[],
    /** In the options object, the property name corresponding to the label */
    label?: string;
    /** In the options object, the property name corresponding to the value */
    value?: string;
  };
  /** Control value change callback */
  change?: (value: NzSafeAny, options: RadioControlOptions) => void;
}

export interface CheckboxControlOptions extends FormControlOptions {
  type: 'checkbox';
  name: string;
  options: {
    /** Options data array */
    data: Record<string, NzSafeAny>[],
    /** In the options object, the property name corresponding to the label */
    label?: string;
    /** In the options object, the property name corresponding to the value */
    value?: string;
  };
  /** Control value change callback */
  change?: (value: NzSafeAny[], options: CheckboxControlOptions) => void;
}
