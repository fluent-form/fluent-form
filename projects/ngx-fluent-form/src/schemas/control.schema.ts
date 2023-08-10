import { TemplateRef } from '@angular/core';
import { AnyObject, SafeAny } from '@ngify/types';
import { NzCascaderComponent, NzCascaderExpandTrigger, NzCascaderOption, NzCascaderSize, NzShowSearchOptions } from 'ng-zorro-antd/cascader';
import { NzCheckboxComponent, NzCheckboxGroupComponent, NzCheckBoxOptionInterface } from 'ng-zorro-antd/checkbox';
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
import { Observable } from 'rxjs';
import { AbstractControlSchema, AbstractDateControlSchema, AbstractInputBoxControlSchema, AbstractTextControlSchema } from './abstract.schema';
import { ComponentControlEventListenerHolder, ComponentPropertyHolder, ElementControlEventListenerHolder, ElementPropertyHolder, PropertyHolder, SchemaContext, SchemaReactiveFn } from './interfaces';
import { AnySchemaKey, SchemaKey } from './types';

export interface HeadlessControlSchema<Key extends SchemaKey> extends AbstractControlSchema<Key, SafeAny>, PropertyHolder {
  kind: 'headless';
  template?: string;
}

export interface InputControlSchema<Key extends SchemaKey = SchemaKey, Val = string>
  extends AbstractTextControlSchema<Key>, ElementControlEventListenerHolder<Val>, ElementPropertyHolder<HTMLInputElement> {
  kind: 'input';
  /* A type of input. */
  type?: 'text' | 'number' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'color';
}

export interface TextareaControlSchema<Key extends SchemaKey = SchemaKey, Val = string>
  extends AbstractTextControlSchema<Key>, ElementControlEventListenerHolder<Val>, ElementPropertyHolder<HTMLTextAreaElement> {
  kind: 'textarea';
  /** The number of lines in the text field */
  rows?: number;
  /** Whether to adapt the content height */
  autosize?: boolean | { minRows: number, maxRows: number };
}

export interface NumberInputControlSchema<Key extends SchemaKey = SchemaKey, Val = number>
  extends AbstractInputBoxControlSchema<Key, Val>, ComponentControlEventListenerHolder<NzInputNumberComponent, Val>, ComponentPropertyHolder<NzInputNumberComponent> {
  kind: 'number';
  range?: { max?: number, min?: number }
  /** Decimal precision */
  precision?: number | { value?: number, mode?: NzInputNumberComponent['nzPrecisionMode'] };
  /** Step length */
  step?: number;
}

export interface DatePickerControlSchema<Key extends SchemaKey = SchemaKey, Val = Date>
  extends AbstractDateControlSchema<Key, Val>, ComponentControlEventListenerHolder<NzDatePickerComponent, Val>, ComponentPropertyHolder<NzDatePickerComponent> {
  kind: 'date';
}

export interface DateRangePickerControlSchema<Key extends AnySchemaKey = AnySchemaKey, Val = [Date, Date]>
  extends AbstractDateControlSchema<Key, Val, [string, string]>, ComponentControlEventListenerHolder<NzRangePickerComponent, Val>, ComponentPropertyHolder<NzRangePickerComponent> {
  kind: 'date-range';
  separator?: string;
}

export interface TimePickerControlSchema<Key extends SchemaKey = SchemaKey, Val = Date>
  extends AbstractInputBoxControlSchema<Key, Val>, ComponentControlEventListenerHolder<NzTimePickerComponent, Val>, ComponentPropertyHolder<NzTimePickerComponent> {
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
  backdrop?: boolean;
  suffixIcon?: string | TemplateRef<void>;
}

export interface ToggleControlSchema<Key extends SchemaKey = SchemaKey, Val = boolean>
  extends AbstractControlSchema<Key, Val>, ComponentControlEventListenerHolder<NzSwitchComponent, Val>, ComponentPropertyHolder<NzSwitchComponent> {
  kind: 'toggle';
  /** Placeholder text */
  placeholder?: [string | TemplateRef<void>, string | TemplateRef<void>];
  size?: NzSizeDSType;
}

export interface SelectControlSchema<Key extends SchemaKey = SchemaKey, Val = SafeAny | SafeAny[]>
  extends AbstractControlSchema<Key, Val>, ComponentControlEventListenerHolder<NzSelectComponent, Val>, ComponentPropertyHolder<NzSelectComponent> {
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
  loading?: boolean;
  options?: AnyObject[] | SchemaReactiveFn<SelectControlSchema<SchemaKey, Val>, AnyObject[]>;
  fetchOptions?: (keyword$: Observable<string>, ctx: SchemaContext<SelectControlSchema<SchemaKey, Val>>) => Observable<AnyObject[]>;
  config?: {
    labelProperty?: string;
    valueProperty?: string;
    disabledProperty?: string;
    hideProperty?: string;
  };
}

export interface CascaderControlSchema<Key extends SchemaKey = SchemaKey, Val = SafeAny[]>
  extends AbstractControlSchema<Key, Val>, ComponentControlEventListenerHolder<NzCascaderComponent, Val>, ComponentPropertyHolder<NzCascaderComponent> {
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
  /** Expand trigger for cascader control */
  trigger?: NzCascaderExpandTrigger;
  /** Support search, cannot be used with `options.load` */
  searchable?: boolean | NzShowSearchOptions;
  options?: NzCascaderOption[] | SchemaReactiveFn<CascaderControlSchema<SchemaKey, Val>, NzCascaderOption[]>;
  fetchOptions?: NzCascaderComponent['nzLoadData'];
  config?: {
    labelProperty?: string;
    valueProperty?: string;
  };
}

export interface SliderControlSchema<Key extends AnySchemaKey = AnySchemaKey, Val = number | [number, number]>
  extends AbstractControlSchema<Key, Val>, ComponentControlEventListenerHolder<NzSliderComponent, Val>, ComponentPropertyHolder<NzSliderComponent> {
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

export interface RadioGroupControlSchema<Key extends SchemaKey = SchemaKey, Val = SafeAny>
  extends AbstractControlSchema<Key, Val>, ComponentControlEventListenerHolder<NzRadioGroupComponent, Val>, ComponentPropertyHolder<NzRadioGroupComponent> {
  kind: 'radio-group';
  size?: NzSizeLDSType;
  options: AnyObject[];
  variants?: {
    button?: NzRadioButtonStyle;
  };
  config?: {
    labelProperty?: string;
    valueProperty?: string;
  };
}

export interface CheckboxControlSchema<Key extends SchemaKey = SchemaKey, Val = boolean>
  extends AbstractControlSchema<Key, Val>, ComponentControlEventListenerHolder<NzCheckboxComponent, Val>, ComponentPropertyHolder<NzCheckboxComponent> {
  kind: 'checkbox';
  content?: string;
  autofocus?: boolean;
  indeterminate?: boolean;
}

export interface CheckboxGroupControlSchema<Key extends SchemaKey = SchemaKey, Val = NzCheckBoxOptionInterface[]>
  extends AbstractControlSchema<Key, Val>, ComponentControlEventListenerHolder<NzCheckboxGroupComponent, Val>, ComponentPropertyHolder<NzCheckboxGroupComponent> {
  kind: 'checkbox-group';
  options: AnyObject[];
  config?: {
    labelProperty?: string;
    valueProperty?: string;
  };
}

export interface RateControlSchema<Key extends SchemaKey = SchemaKey, Val = number>
  extends AbstractControlSchema<Key, Val>, ComponentControlEventListenerHolder<NzRateComponent, Val>, ComponentPropertyHolder<NzRateComponent> {
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

export interface TreeSelectControlSchema<Key extends SchemaKey = SchemaKey, Val = SafeAny[]>
  extends AbstractControlSchema<Key, Val>, ComponentControlEventListenerHolder<NzTreeSelectComponent, Val>, ComponentPropertyHolder<NzTreeSelectComponent> {
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
}
