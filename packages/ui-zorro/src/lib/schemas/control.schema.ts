import { TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractControlSchema, AbstractHeadlessControlSchema, ComponentControlEventListenerHolder, ComponentPropertyHolder, ElementControlEventListenerHolder, ElementPropertyHolder, Length, MaybeSchemaReactiveFn, SchemaContext, SchemaKey, SingleSchemaKey } from '@fluent-form/core';
import { AnyObject, SafeAny } from '@ngify/types';
import { NzCascaderComponent, NzCascaderExpandTrigger, NzCascaderOption, NzCascaderSize, NzShowSearchOptions } from 'ng-zorro-antd/cascader';
import { NzCheckBoxOptionInterface, NzCheckboxComponent, NzCheckboxGroupComponent } from 'ng-zorro-antd/checkbox';
import { NzColorPickerComponent } from 'ng-zorro-antd/color-picker';
import { NzSizeDSType, NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzDateMode, NzDatePickerComponent, NzRangePickerComponent, SupportTimeOptions } from 'ng-zorro-antd/date-picker';
import { NzPlacement } from 'ng-zorro-antd/date-picker/date-picker.component';
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
import { Labelful } from './interfaces';

export interface AbstractZorroControlSchema<Key extends SchemaKey = SchemaKey, Val = SafeAny> extends AbstractControlSchema<Key, Val>, Labelful {
  feedback?: boolean;
  hint?: string | TemplateRef<void>;
  /** Error message for control */
  tips?: {
    success?: string | TemplateRef<{ $implicit: FormControl<Val> }>;
    warning?: string | TemplateRef<{ $implicit: FormControl<Val> }>;
    error?: string | TemplateRef<{ $implicit: FormControl<Val> }>;
    validating?: string | TemplateRef<{ $implicit: FormControl<Val> }>;
    auto?: Record<'default' | (string & {}), Record<string, string>>;
  };
}

/**
 * 抽象的输入框图示
 */
interface AbstractInputBoxControlSchema<Key extends SchemaKey, Val, P extends string | [string, string] = string> extends AbstractZorroControlSchema<Key, Val> {
  placeholder?: MaybeSchemaReactiveFn<AbstractInputBoxControlSchema<SchemaKey, Val, P>, P>;
  autofocus?: boolean;
  readonly?: MaybeSchemaReactiveFn<AbstractInputBoxControlSchema<SchemaKey, Val, P>, boolean>;
  size?: NzSizeLDSType;
  borderless?: boolean;
}

/**
 * 抽象的文本控件图示
 */
interface AbstractTextControlSchema<Key extends SchemaKey = SchemaKey> extends AbstractInputBoxControlSchema<Key, string> {
  length?: Length;
}

/**
 * 抽象的日期控件图示
 */
interface AbstractDateControlSchema<Key extends SchemaKey, Val, P extends string | [string, string] = string> extends AbstractInputBoxControlSchema<Key, Val, P> {
  /** Mode of date picker control */
  mode?: NzDateMode;
  /** Show clean button */
  clearable?: boolean;
  /** Show time picker in date picker */
  time?: boolean | SupportTimeOptions;
  /** Date display format */
  format?: string;
  /** Inline mode */
  inline?: boolean;
  backdrop?: boolean;
  placement?: NzPlacement;
  today?: boolean;
  now?: boolean;
  suffixIcon?: string | TemplateRef<void>;
}

/**
 * @public
 */
export interface HeadlessControlSchema<Key extends SingleSchemaKey = SingleSchemaKey> extends AbstractZorroControlSchema<Key, SafeAny>, AbstractHeadlessControlSchema {
  kind: 'headless';
}

/**
 * @public
 */
export interface TextControlSchema<Key extends SingleSchemaKey = SingleSchemaKey, Val = string>
  extends AbstractTextControlSchema<Key>, ElementControlEventListenerHolder<Val>, ElementPropertyHolder<HTMLInputElement> {
  kind: 'text';
  /* A type of input. */
  type?: 'text' | 'number' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'color';
  addons?: {
    before?: MaybeSchemaReactiveFn<TextControlSchema, string | TemplateRef<void> | { icon: string } | null>;
    after?: MaybeSchemaReactiveFn<TextControlSchema, string | TemplateRef<void> | { icon: string } | null>;
  };
  affixes?: {
    prefix?: MaybeSchemaReactiveFn<TextControlSchema, string | TemplateRef<void> | { icon: string } | null>;
    suffix?: MaybeSchemaReactiveFn<TextControlSchema, string | TemplateRef<void> | { icon: string } | null>;
  };
}

/**
 * @public
 */
export interface TextareaControlSchema<Key extends SingleSchemaKey = SingleSchemaKey, Val = string>
  extends AbstractTextControlSchema<Key>, ElementControlEventListenerHolder<Val>, ElementPropertyHolder<HTMLTextAreaElement> {
  kind: 'textarea';
  /** The number of lines in the text field */
  rows?: number;
  /** Whether to adapt the content height */
  autosize?: boolean | { minRows: number, maxRows: number };
}

/**
 * @public
 */
export interface NumberControlSchema<Key extends SingleSchemaKey = SingleSchemaKey, Val = number>
  extends AbstractInputBoxControlSchema<Key, Val>, ComponentControlEventListenerHolder<NzInputNumberComponent, Val>, ComponentPropertyHolder<NzInputNumberComponent> {
  kind: 'number';
  range?: { max?: number, min?: number }
  /** Decimal precision */
  precision?: number | { value?: number, mode?: NzInputNumberComponent['nzPrecisionMode'] };
  /** Step length */
  step?: number;
  addons?: {
    before?: MaybeSchemaReactiveFn<NumberControlSchema, string | TemplateRef<void> | { icon: string } | null>;
    after?: MaybeSchemaReactiveFn<NumberControlSchema, string | TemplateRef<void> | { icon: string } | null>;
  };
  affixes?: {
    prefix?: MaybeSchemaReactiveFn<NumberControlSchema, string | TemplateRef<void> | { icon: string } | null>;
    suffix?: MaybeSchemaReactiveFn<NumberControlSchema, string | TemplateRef<void> | { icon: string } | null>;
  };
}

/**
 * @public
 */
export interface DatePickerControlSchema<Key extends SingleSchemaKey = SingleSchemaKey, Val = Date>
  extends AbstractDateControlSchema<Key, Val>, ComponentControlEventListenerHolder<NzDatePickerComponent, Val>, ComponentPropertyHolder<NzDatePickerComponent> {
  kind: 'date';
}

/**
 * @public
 */
export interface DateRangePickerControlSchema<Key extends SchemaKey = SchemaKey, Val = [Date, Date]>
  extends AbstractDateControlSchema<Key, Val, [string, string]>, ComponentControlEventListenerHolder<NzRangePickerComponent, Val>, ComponentPropertyHolder<NzRangePickerComponent> {
  kind: 'date-range';
  separator?: string;
}

/**
 * @public
 */
export interface TimePickerControlSchema<Key extends SingleSchemaKey = SingleSchemaKey, Val = Date>
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

/**
 * @public
 */
export interface ToggleControlSchema<Key extends SingleSchemaKey = SingleSchemaKey, Val = boolean>
  extends AbstractZorroControlSchema<Key, Val>, ComponentControlEventListenerHolder<NzSwitchComponent, Val>, ComponentPropertyHolder<NzSwitchComponent> {
  kind: 'toggle';
  /** Placeholder text */
  placeholder?: MaybeSchemaReactiveFn<ToggleControlSchema<Key, Val>, [string, string]>;
  size?: NzSizeDSType;
}

/**
 * @public
 */
export interface SelectControlSchema<Key extends SingleSchemaKey = SingleSchemaKey, Val = SafeAny | SafeAny[]>
  extends AbstractZorroControlSchema<Key, Val>, ComponentControlEventListenerHolder<NzSelectComponent, Val>, ComponentPropertyHolder<NzSelectComponent> {
  kind: 'select';
  /** Placeholder text */
  placeholder?: MaybeSchemaReactiveFn<SelectControlSchema<Key, Val>, string>;
  /** Show clean button */
  clearable?: boolean;
  /** Mode of select control */
  mode?: NzSelectModeType;
  /** Max selected count */
  length?: { max: number };
  /** Support search */
  searchable?: boolean;
  backdrop?: boolean;
  borderless?: boolean;
  autofocus?: boolean;
  arrow?: boolean;
  size?: NzSelectSizeType;
  suffixIcon?: string | TemplateRef<SafeAny>;
  loading?: boolean;
  option?: string | TemplateRef<{ $implicit: SafeAny }>;
  options?: MaybeSchemaReactiveFn<SelectControlSchema<SingleSchemaKey, Val>, AnyObject[]>;
  fetchOptions?: (keyword$: Observable<string>, ctx: SchemaContext<SelectControlSchema<SingleSchemaKey, Val>>) => Observable<AnyObject[]>;
  config?: {
    labelProperty?: string;
    valueProperty?: string;
    disabledProperty?: string;
    hideProperty?: string;
  };
}

/**
 * @public
 */
export interface CascaderControlSchema<Key extends SchemaKey = SchemaKey, Val = SafeAny[]>
  extends AbstractZorroControlSchema<Key, Val>, ComponentControlEventListenerHolder<NzCascaderComponent, Val>, ComponentPropertyHolder<NzCascaderComponent> {
  kind: 'cascader';
  /** Placeholder text */
  placeholder?: MaybeSchemaReactiveFn<CascaderControlSchema<Key, Val>, string>;
  /** Show clean button */
  clearable?: boolean;
  changeOnSelect?: boolean;
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
  options?: MaybeSchemaReactiveFn<CascaderControlSchema<SingleSchemaKey, Val>, NzCascaderOption[]>;
  fetchOptions?: (node: NzCascaderOption, index: number, ctx: SchemaContext<CascaderControlSchema<SchemaKey, Val>>) => PromiseLike<SafeAny> | Observable<SafeAny>;
  config?: {
    labelProperty?: string;
    valueProperty?: string;
  };
}

/**
 * @public
 */
export interface SliderControlSchema<Key extends SchemaKey = SchemaKey, Val = number | [number, number]>
  extends AbstractZorroControlSchema<Key, Val>, ComponentControlEventListenerHolder<NzSliderComponent, Val>, ComponentPropertyHolder<NzSliderComponent> {
  kind: 'slider';
  /** Containment relationship */
  included?: boolean;
  /** range of value */
  range?: { max?: number, min?: number }
  /** slider type */
  type?: 'range' | 'single'
  /** Step length */
  step?: number;
  dots?: boolean;
  vertical?: boolean;
  reverse?: boolean;
}

/**
 * @public
 */
export interface RadioGroupControlSchema<Key extends SingleSchemaKey = SingleSchemaKey, Val = SafeAny>
  extends AbstractZorroControlSchema<Key, Val>, ComponentControlEventListenerHolder<NzRadioGroupComponent, Val>, ComponentPropertyHolder<NzRadioGroupComponent> {
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

/**
 * @public
 */
export interface CheckboxControlSchema<Key extends SingleSchemaKey = SingleSchemaKey, Val = boolean>
  extends AbstractZorroControlSchema<Key, Val>, ComponentControlEventListenerHolder<NzCheckboxComponent, Val>, ComponentPropertyHolder<NzCheckboxComponent> {
  kind: 'checkbox';
  content?: string;
  autofocus?: boolean;
  indeterminate?: boolean;
}

/**
 * @public
 */
export interface CheckboxGroupControlSchema<Key extends SingleSchemaKey = SingleSchemaKey, Val = NzCheckBoxOptionInterface[]>
  extends AbstractZorroControlSchema<Key, Val>, ComponentControlEventListenerHolder<NzCheckboxGroupComponent, Val>, ComponentPropertyHolder<NzCheckboxGroupComponent> {
  kind: 'checkbox-group';
  options: AnyObject[];
  config?: {
    labelProperty?: string;
    valueProperty?: string;
  };
}

/**
 * @public
 */
export interface RateControlSchema<Key extends SingleSchemaKey = SingleSchemaKey, Val = number>
  extends AbstractZorroControlSchema<Key, Val>, ComponentControlEventListenerHolder<NzRateComponent, Val>, ComponentPropertyHolder<NzRateComponent> {
  kind: 'rate';
  /** Show clean button */
  clearable?: boolean;
  /** whether to allow semi selection */
  half?: boolean;
  /** star count */
  count?: number;
  /** custom character of rate */
  character?: string | TemplateRef<void>;
  /** Customize tooltip by each character */
  tooltips?: string[];
  autofocus?: boolean;
}

/**
 * @public
 */
export interface TreeSelectControlSchema<Key extends SingleSchemaKey = SingleSchemaKey, Val = SafeAny[]>
  extends AbstractZorroControlSchema<Key, Val>, ComponentControlEventListenerHolder<NzTreeSelectComponent, Val>, ComponentPropertyHolder<NzTreeSelectComponent> {
  kind: 'tree-select';
  clearable?: boolean;
  placeholder?: MaybeSchemaReactiveFn<TreeSelectControlSchema<Key, Val>, string>;
  icon?: boolean;
  searchable?: boolean;
  size?: NzSizeLDSType;
  checkable?: boolean | { strict: boolean };
  expandIcon?: boolean | NzTreeSelectComponent['nzExpandedIcon'];
  line?: boolean;
  async?: boolean;
  options: MaybeSchemaReactiveFn<TreeSelectControlSchema<SingleSchemaKey, Val>, NzTreeNodeOptions[]>;
  expandAll?: boolean;
  expandedKeys?: string[];
  backdrop?: boolean;
  multiple?: boolean;
}

export interface ColorPickerControlSchema<Key extends SingleSchemaKey = SingleSchemaKey, Val = string>
  extends AbstractZorroControlSchema<Key, Val>, ComponentControlEventListenerHolder<NzColorPickerComponent, Val>, ComponentPropertyHolder<NzColorPickerComponent> {
  kind: 'color';
  format?: NzColorPickerComponent['nzFormat'];
  size?: NzColorPickerComponent['nzSize'];
  clearable?: boolean;
  trigger?: NzColorPickerComponent['nzTrigger'];
  showText?: boolean;
  alpha?: boolean;
  title?: string | TemplateRef<void>
}
