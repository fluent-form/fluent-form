import { TemplateRef } from '@angular/core';
import { AnyObject, SafeAny } from '@ngify/types';
import { NzCascaderComponent, NzCascaderExpandTrigger, NzCascaderOption, NzCascaderSize, NzShowSearchOptions } from 'ng-zorro-antd/cascader';
import { NzCheckBoxOptionInterface, NzCheckboxComponent, NzCheckboxGroupComponent } from 'ng-zorro-antd/checkbox';
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
import { AbstractControlSchema, AbstractDateControlSchema, AbstractTextControlSchema } from './abstract.schema';
import { AbstractInputField, ComponentControlEventListener, ComponentPropertyPatcher, ElementControlEventListener, ElementPropertyPatcher } from './interfaces';
import { AnySchemaName, SchemaName } from './types';

export interface InputControlSchema<Name extends SchemaName = SchemaName, Val = string>
  extends AbstractTextControlSchema<Name, Val>, ElementControlEventListener<Val>, ElementPropertyPatcher<HTMLInputElement> {
  kind: 'input';
  /* A type of input. */
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'color';
}

export interface TextareaControlSchema<Name extends SchemaName = SchemaName, Val = string>
  extends AbstractTextControlSchema<Name, Val>, ElementControlEventListener<Val>, ElementPropertyPatcher<HTMLTextAreaElement> {
  kind: 'textarea';
  /** The number of lines in the text field */
  rows?: number;
  /** Whether to adapt the content height */
  autosize?: boolean | { minRows: number, maxRows: number };
}

export interface NumberInputControlSchema<Name extends SchemaName = SchemaName, Val = number>
  extends AbstractControlSchema<Name, Val>, AbstractInputField, ComponentControlEventListener<NzInputNumberComponent, Val>, ComponentPropertyPatcher<NzInputNumberComponent> {
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

export interface DatePickerControlSchema<Name extends SchemaName = SchemaName, Val = Date>
  extends AbstractDateControlSchema<Name, Val>, AbstractInputField, ComponentControlEventListener<NzDatePickerComponent, Val>, ComponentPropertyPatcher<NzDatePickerComponent> {
  kind: 'date';
}

export interface DateRangePickerControlSchema<Name extends AnySchemaName = AnySchemaName, Val = [Date, Date]>
  extends AbstractDateControlSchema<Name, Val>, AbstractInputField<[string, string]>, ComponentControlEventListener<NzRangePickerComponent, Val>, ComponentPropertyPatcher<NzRangePickerComponent> {
  kind: 'date-range';
  separator?: string;
}

export interface TimePickerControlSchema<Name extends SchemaName = SchemaName, Val = Date>
  extends AbstractControlSchema<Name, Val>, AbstractInputField, ComponentControlEventListener<NzTimePickerComponent, Val>, ComponentPropertyPatcher<NzTimePickerComponent> {
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

export interface ToggleControlSchema<Name extends SchemaName = SchemaName, Val = boolean>
  extends AbstractControlSchema<Name, Val>, ComponentControlEventListener<NzSwitchComponent, Val>, ComponentPropertyPatcher<NzSwitchComponent> {
  kind: 'toggle';
  /** Placeholder text */
  placeholder?: [string | TemplateRef<void>, string | TemplateRef<void>];
  size?: NzSizeDSType;
}

export interface SelectControlSchema<Name extends SchemaName = SchemaName, Val = SafeAny | SafeAny[]>
  extends AbstractControlSchema<Name, Val>, ComponentControlEventListener<NzSelectComponent, Val>, ComponentPropertyPatcher<NzSelectComponent> {
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
  options?: AnyObject[];
  fetchOptions?: (keyword$: Observable<string>) => Observable<AnyObject[]>;
  config?: {
    labelProperty?: string;
    valueProperty?: string;
    disabledProperty?: string;
    hideProperty?: string;
  };
}

export interface CascaderControlSchema<Name extends SchemaName = SchemaName, Val = SafeAny[]>
  extends AbstractControlSchema<Name, Val>, ComponentControlEventListener<NzCascaderComponent, Val>, ComponentPropertyPatcher<NzCascaderComponent> {
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

export interface SliderControlSchema<Name extends AnySchemaName = AnySchemaName, Val = number | [number, number]>
  extends AbstractControlSchema<Name, Val>, ComponentControlEventListener<NzSliderComponent, Val>, ComponentPropertyPatcher<NzSliderComponent> {
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

export interface RadioGroupControlSchema<Name extends SchemaName = SchemaName, Val = SafeAny>
  extends AbstractControlSchema<Name, Val>, ComponentControlEventListener<NzRadioGroupComponent, Val>, ComponentPropertyPatcher<NzRadioGroupComponent> {
  kind: 'radio-group';
  button?: NzRadioButtonStyle;
  size?: NzSizeLDSType;
  options: AnyObject[];
  config?: {
    labelProperty?: string;
    valueProperty?: string;
  };
}

export interface CheckboxControlSchema<Name extends SchemaName = SchemaName, Val = boolean>
  extends AbstractControlSchema<Name, Val>, ComponentControlEventListener<NzCheckboxComponent, Val>, ComponentPropertyPatcher<NzCheckboxComponent> {
  kind: 'checkbox';
  content?: string;
  autofocus?: boolean;
  indeterminate?: boolean;
}

export interface CheckboxGroupControlSchema<Name extends SchemaName = SchemaName, Val = NzCheckBoxOptionInterface[]>
  extends AbstractControlSchema<Name, Val>, ComponentControlEventListener<NzCheckboxGroupComponent, Val>, ComponentPropertyPatcher<NzCheckboxGroupComponent> {
  kind: 'checkbox-group';
  options: AnyObject[];
  config?: {
    labelProperty?: string;
    valueProperty?: string;
  };
}

export interface RateControlSchema<Name extends SchemaName = SchemaName, Val = number>
  extends AbstractControlSchema<Name, Val>, ComponentControlEventListener<NzRateComponent, Val>, ComponentPropertyPatcher<NzRateComponent> {
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

export interface TreeSelectControlSchema<Name extends SchemaName = SchemaName, Val = SafeAny[]>
  extends AbstractControlSchema<Name, Val>, ComponentControlEventListener<NzTreeSelectComponent, Val>, ComponentPropertyPatcher<NzTreeSelectComponent> {
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
