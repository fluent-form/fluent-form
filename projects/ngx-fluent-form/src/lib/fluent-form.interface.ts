import { TemplateRef } from '@angular/core';
import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { NzCascaderComponent } from 'ng-zorro-antd/cascader';
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
  type: string;
  name: string;
  span: number;
  label?: string;
  mapper?: {
    input: (value?: NzSafeAny) => NzSafeAny,
    output: (value?: NzSafeAny) => NzSafeAny,
  };
  required?: boolean;
  disabled?: boolean;
  errorTip?: string;
  validator?: ValidatorFn | ValidatorFn[];
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[];
}

export interface EmbeddedFormOptions extends FormControlOptions {
  type: 'embed';
  schema: AnyControlOptions[];
  // 禁用以下属性，内嵌表单似乎用不上
  mapper?: never;
  required?: never;
  disabled?: never;
  errorTip?: never;
  validators?: never;
  asyncValidator?: never;
}

export interface InputControlOptions extends FormControlOptions {
  type: 'text' | 'email' | 'password';
  placeholder?: string;
  before?: {
    icon?: string,
    template?: string | TemplateRef<void>
  };
  after?: {
    icon?: string,
    template?: string | TemplateRef<void>
  };
  prefix?: string | TemplateRef<void>;
  suffix?: string | TemplateRef<void>;
  change?: (value: string, options: InputControlOptions) => void;
}

export interface TextareaControlOptions extends FormControlOptions {
  type: 'textarea';
  rows?: number;
  autosize?: boolean | { minRows: number, maxRows: number };
  placeholder?: string;
  change?: (value: string, options: TextareaControlOptions) => void;
}

export interface NumberInputControlOptions extends FormControlOptions {
  type: 'number';
  placeholder?: string;
  max?: number;
  min?: number;
  /** 小数精度 */
  precision?: number;
  precisionMode?: NzInputNumberComponent['nzPrecisionMode'];
  step?: number;
  change?: (value: number, options: NumberInputControlOptions) => void;
}

export interface DatePickerControlOptions extends FormControlOptions {
  type: 'date';
  placeholder?: string;
  mode?: NzDatePickerComponent['nzMode'];
  clear?: boolean;
  showTime?: boolean;
  format?: string;
  time?: boolean;
  change?: (value: Date, options: DatePickerControlOptions) => void;
}

export interface RangePickerControlOptions extends FormControlOptions {
  type: 'range';
  placeholder?: [string, string];
  mode?: NzDatePickerComponent['nzMode'];
  showTime?: boolean;
  clear?: boolean;
  format?: string;
  change?: (value: [Date, Date], options: DatePickerControlOptions) => void;
}

export interface TimePickerControlOptions extends FormControlOptions {
  type: 'time';
  placeholder?: string;
  clear?: boolean;
  format?: string;
  step?: {
    hour?: number;
    minute?: number;
    second?: number;
  };
  change?: (value: Date, options: TimePickerControlOptions) => void;
}

export interface SwitchControlOptions extends FormControlOptions {
  type: 'switch';
  placeholder?: [string | TemplateRef<void>, string | TemplateRef<void>];
  change?: (value: boolean, options: SwitchControlOptions) => void;
}

export interface SelectControlOptions extends FormControlOptions {
  type: 'select';
  placeholder?: string;
  clear?: boolean;
  mode?: NzSelectComponent['nzMode'];
  /** 最多选中多少个标签 */
  limit?: number;
  /** 使单选模式可搜索 */
  search?: boolean;
  options: {
    data: Record<string, NzSafeAny>,
    label?: string;
    value?: string;
  };
  change?: (value: NzSafeAny | NzSafeAny[], options: SelectControlOptions) => void;
}

export interface CascaderControlOptions extends FormControlOptions {
  type: 'cascader';
  placeholder?: string;
  clear?: boolean;
  trigger?: NzCascaderComponent['nzExpandTrigger'];
  /** 是否支持搜索，默认情况下对 label 进行全匹配搜索，不能和 [nzLoadData] 同时使用 */
  search?: boolean;
  options: {
    data?: Record<string, NzSafeAny>[],
    label?: string;
    value?: string;
    load?: NzCascaderComponent['nzLoadData']
  };
  change?: (value: NzSafeAny[], options: CascaderControlOptions) => void;
}

export interface SliderControlOptions extends FormControlOptions {
  type: 'slider';
  placeholder?: never;
  included?: boolean;
  max?: number;
  min?: number;
  range?: boolean;
  step?: number;
  change?: (value: number | number[], options: SliderControlOptions) => void;
}

export interface RadioControlOptions extends FormControlOptions {
  type: 'radio';
  /** 单选框样式 */
  style?: 'outline' | 'solid';
  options: {
    data: Record<string, NzSafeAny>[],
    label?: string;
    value?: string;
  };
  change?: (value: NzSafeAny, options: RadioControlOptions) => void;
}

export interface CheckboxControlOptions extends FormControlOptions {
  type: 'checkbox';
  options: {
    data: Record<string, NzSafeAny>[],
    label?: string;
    value?: string;
  };
  change?: (value: NzSafeAny[], options: CheckboxControlOptions) => void;
}
