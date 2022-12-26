import { TemplateRef } from '@angular/core';
import { SafeAny } from '@ngify/types';
import { NzCascaderComponent, NzCascaderExpandTrigger, NzCascaderOption, NzCascaderSize, NzShowSearchOptions } from 'ng-zorro-antd/cascader';
import { NzCheckboxComponent, NzCheckboxGroupComponent } from 'ng-zorro-antd/checkbox';
import { NzSizeDSType, NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzDatePickerComponent, NzRangePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
import { NzRadioButtonStyle, NzRadioGroupComponent } from 'ng-zorro-antd/radio';
import { NzRateComponent } from 'ng-zorro-antd/rate';
import { NzSelectComponent, NzSelectModeType, NzSelectSizeType } from 'ng-zorro-antd/select';
import { NzSliderComponent } from 'ng-zorro-antd/slider';
import { NzSwitchComponent } from 'ng-zorro-antd/switch';
import { NzTimePickerComponent } from 'ng-zorro-antd/time-picker';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzTreeSelectComponent } from 'ng-zorro-antd/tree-select';
import { AnyObject } from '../types';
import { AbstractComponentControlSchema, AbstractControlSchema, AbstractDateControlSchema, AbstractElementControlSchema, AbstractInputFieldControlSchema, AbstractTextControlSchema, AnySchemaName, SchemaName } from './abstract.schema';

export interface InputControlSchema<Name extends SchemaName = SchemaName, Val = string> extends AbstractTextControlSchema<Name, Val>, AbstractElementControlSchema<HTMLInputElement, Val>, AbstractInputFieldControlSchema {
  kind: 'input';
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'color';
}

export interface TextareaControlSchema<Name extends SchemaName = SchemaName, Val = string> extends AbstractTextControlSchema<Name, Val>, AbstractElementControlSchema<HTMLTextAreaElement, Val>, AbstractInputFieldControlSchema {
  kind: 'textarea';
  /** The number of lines in the text field */
  rows?: number;
  /** Whether to adapt the content height */
  autosize?: boolean | { minRows: number, maxRows: number };
}

export interface NumberInputControlSchema<Name extends SchemaName = SchemaName, Val = number> extends AbstractControlSchema<Name, Val>, AbstractComponentControlSchema<NzInputNumberComponent, Val>, AbstractInputFieldControlSchema {
  kind: 'number';
  /** Maximum value */
  max?: number;
  /** Minimum value */
  min?: number;
  /** Decimal precision */
  precision?: number | { value?: number, mode?: NzInputNumberComponent['nzPrecisionMode'] };
  /** Step length */
  step?: number;
}

export interface DatePickerControlSchema<Name extends SchemaName = SchemaName, Val = Date> extends AbstractDateControlSchema<Name, Val>, AbstractComponentControlSchema<NzDatePickerComponent, Val>, AbstractInputFieldControlSchema {
  kind: 'date';
}

export interface RangePickerControlSchema<Name extends AnySchemaName = AnySchemaName, Val = [Date, Date]> extends AbstractDateControlSchema<Name, Val>, AbstractComponentControlSchema<NzRangePickerComponent, Val>, AbstractInputFieldControlSchema<[string, string]> {
  kind: 'date-range';
  separator?: string;
}

export interface TimePickerControlSchema<Name extends SchemaName = SchemaName, Val = Date> extends AbstractControlSchema<Name, Val>, AbstractComponentControlSchema<NzTimePickerComponent, Val>, AbstractInputFieldControlSchema {
  kind: 'time';
  /** Show clean button */
  clearable?: boolean;
  /** Time display format */
  format?: string;
  /** Time step length */
  step?: {
    hour?: number;
    minute?: number;
    second?: number;
  };
  readonly?: boolean;
  backdrop?: boolean;
  suffixIcon?: string | TemplateRef<void>;
}

export interface ToggleControlSchema<Name extends SchemaName = SchemaName, Val = boolean> extends AbstractControlSchema<Name, Val>, AbstractComponentControlSchema<NzSwitchComponent, Val> {
  kind: 'toggle';
  /** Placeholder text */
  placeholder?: [string | TemplateRef<void>, string | TemplateRef<void>];
  size?: NzSizeDSType;
}

export interface SelectControlSchema<Name extends SchemaName = SchemaName, Val = SafeAny | SafeAny[]> extends AbstractControlSchema<Name, Val>, AbstractComponentControlSchema<NzSelectComponent, Val> {
  kind: 'select';
  /** Placeholder text */
  placeholder?: string;
  /** Show clean button */
  clearable?: boolean;
  /** Mode of select control */
  mode?: NzSelectModeType;
  /** Max selected */
  limit?: number;
  /** Support search */
  searchable?: boolean;
  backdrop?: boolean;
  borderless?: boolean;
  autofocus?: boolean;
  arrow?: boolean;
  size?: NzSelectSizeType;
  suffixIcon?: TemplateRef<SafeAny> | string;
  options: AnyObject[];
  config?: {
    labelProperty?: string;
    valueProperty?: string;
    disabledProperty?: string;
  };
}

export interface CascaderControlSchema<Name extends SchemaName = SchemaName, Val = SafeAny[]> extends AbstractControlSchema<Name, Val>, AbstractComponentControlSchema<NzCascaderComponent, Val> {
  kind: 'cascader';
  /** Placeholder text */
  placeholder?: string;
  /** Show clean button */
  clearable?: boolean;
  autofocus?: boolean;
  backdrop?: boolean;
  expandIcon?: string | TemplateRef<void>;
  suffixIcon?: string | TemplateRef<void>;
  arrow?: boolean;
  size?: NzCascaderSize;
  loadData?: (node: NzCascaderOption, index: number) => PromiseLike<SafeAny>;
  /** Expand trigger for cascader control */
  trigger?: NzCascaderExpandTrigger;
  /** Support search, cannot be used with `options.load` */
  searchable?: boolean | NzShowSearchOptions;
  options?: NzCascaderOption[];
  config?: {
    labelProperty?: string;
    valueProperty?: string;
  };
}

export interface SliderControlSchema<Name extends AnySchemaName = AnySchemaName, Val = number | [number, number]> extends AbstractControlSchema<Name, Val>, AbstractComponentControlSchema<NzSliderComponent, Val> {
  kind: 'slider';
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
  dots?: boolean;
  vertical?: boolean;
  reverse?: boolean;
}

export interface RadioControlSchema<Name extends SchemaName = SchemaName, Val = SafeAny> extends AbstractControlSchema<Name, Val>, AbstractComponentControlSchema<NzRadioGroupComponent, Val> {
  kind: 'radio-group';
  button?: boolean | NzRadioButtonStyle;
  size?: NzSizeLDSType;
  options: AnyObject[];
  config?: {
    labelProperty?: string;
    valueProperty?: string;
  };
}

export interface CheckboxControlSchema<Name extends SchemaName = SchemaName, Val = boolean> extends AbstractControlSchema<Name, Val>, AbstractComponentControlSchema<NzCheckboxComponent, Val> {
  kind: 'checkbox';
  content?: string;
  autofocus?: boolean;
  indeterminate?: boolean;
}

export interface CheckboxGroupControlSchema<Name extends SchemaName = SchemaName, Val = SafeAny> extends AbstractControlSchema<Name, Val>, AbstractComponentControlSchema<NzCheckboxGroupComponent, Val> {
  kind: 'checkbox-group';
  options: AnyObject[];
  config?: {
    labelProperty?: string;
    valueProperty?: string;
  };
}

export interface RateControlSchema<Name extends SchemaName = SchemaName, Val = number> extends AbstractControlSchema<Name, Val>, AbstractComponentControlSchema<NzRateComponent, Val> {
  kind: 'rate';
  /** Show clean button */
  clearable?: boolean;
  /** whether to allow semi selection */
  half?: boolean;
  /** star count */
  count?: number;
  /** custom character of rate */
  character?: TemplateRef<void>;
  /** Customize tooltip by each character */
  tooltips?: string[];
  autofocus?: boolean;
}

export interface TreeSelectControlSchema<Name extends SchemaName = SchemaName, Val = SafeAny[]> extends AbstractControlSchema<Name, Val>, AbstractComponentControlSchema<NzTreeSelectComponent, Val> {
  kind: 'tree-select';
  clearable?: boolean;
  placeholder?: string;
  icon?: boolean;
  searchable?: boolean;
  size?: NzSizeLDSType;
  checkable?: boolean | { strict: boolean };
  expandIcon?: boolean | NzTreeSelectComponent['nzExpandedIcon'];
  line?: boolean;
  async?: boolean;
  options: NzTreeNodeOptions[];
  expandAll?: boolean;
  expandedKeys?: string[];
  backdrop?: boolean;
  multiple?: boolean;
  virtual?: {
    height?: string;
    itemSize?: number;
    buffer?: {
      min?: number;
      max?: number;
    }
  }
}