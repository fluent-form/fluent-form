import { TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  AbstractControlSchema,
  AbstractHeadfulControlSchema,
  ComponentControlEventListenerHolder,
  ComponentControlEventObserverHolder,
  ComponentPropertyHolder,
  ElementControlEventListenerHolder,
  ElementControlEventObserverHolder,
  ElementPropertyHolder,
  Length,
  MaybeSchemaReactiveFn,
  SchemaContext,
  SchemaKey,
  SingleSchemaKey
} from '@fluent-form/core';
import { SafeAny } from '@ngify/core';
import {
  NzCascaderComponent,
  NzCascaderExpandTrigger,
  NzCascaderOption,
  NzCascaderPlacement,
  NzCascaderSize,
  NzShowSearchOptions
} from 'ng-zorro-antd/cascader';
import { NzCheckboxComponent, NzCheckboxGroupComponent } from 'ng-zorro-antd/checkbox';
import { NzColorPickerComponent } from 'ng-zorro-antd/color-picker';
import { NzSizeDSType, NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzDateMode, NzDatePickerComponent, NzRangePickerComponent, SupportTimeOptions } from 'ng-zorro-antd/date-picker';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
import { NzRadioButtonStyle, NzRadioGroupComponent } from 'ng-zorro-antd/radio';
import { NzRateComponent } from 'ng-zorro-antd/rate';
import { NzSegmentedComponent, NzSegmentedOptions } from 'ng-zorro-antd/segmented';
import { NzSelectComponent, NzSelectModeType, NzSelectOptionInterface, NzSelectSizeType } from 'ng-zorro-antd/select';
import { NzSliderComponent } from 'ng-zorro-antd/slider';
import { NzSwitchComponent } from 'ng-zorro-antd/switch';
import { NzTimePickerComponent } from 'ng-zorro-antd/time-picker';
import { NzTransferComponent } from 'ng-zorro-antd/transfer';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzTreeSelectComponent } from 'ng-zorro-antd/tree-select';
import { Observable } from 'rxjs';
import { Labelful } from './interfaces';

export interface AbstractZorroControlSchema<Key extends SchemaKey = SchemaKey, Val = SafeAny>
  extends AbstractControlSchema<Key, Val>, Labelful {
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
interface AbstractInputBoxControlSchema<Key extends SchemaKey, Val, P extends string | [string, string] = string>
  extends AbstractZorroControlSchema<Key, Val> {
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
interface AbstractDateControlSchema<Key extends SchemaKey, Val, P extends string | [string, string] = string>
  extends AbstractInputBoxControlSchema<Key, Val, P> {
  /** Mode of date picker control */
  mode?: NzDateMode;
  /** Show clean button */
  clearable?: boolean;
  /** Show time picker in date picker */
  time?: boolean | SupportTimeOptions;
  /** Date display format */
  format?: string;
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
  today?: boolean;
  now?: boolean;
  suffixIcon?: string | TemplateRef<void>;
}

/**
 * @public
 */
export interface HeadfulControlSchema<Key extends SingleSchemaKey = SingleSchemaKey>
  extends AbstractZorroControlSchema<Key, SafeAny>, AbstractHeadfulControlSchema {
  kind: 'headful';
}

/**
 * @public
 */
export interface TextFieldControlSchema<Key extends SingleSchemaKey = SingleSchemaKey, Val = string>
  extends AbstractTextControlSchema<Key>,
  ElementControlEventListenerHolder<Val>,
  ElementControlEventObserverHolder<Val>,
  ElementPropertyHolder<HTMLInputElement> {
  kind: 'text-field';
  /* A type of input. */
  type?: 'text' | 'number' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'color';
  addons?: {
    before?: MaybeSchemaReactiveFn<TextFieldControlSchema, string | TemplateRef<void> | null>;
    after?: MaybeSchemaReactiveFn<TextFieldControlSchema, string | TemplateRef<void> | null>;
  };
  affixes?: {
    prefix?: MaybeSchemaReactiveFn<TextFieldControlSchema, string | TemplateRef<void> | null>;
    suffix?: MaybeSchemaReactiveFn<TextFieldControlSchema, string | TemplateRef<void> | null>;
  };
}

/**
 * @public
 */
export interface TextAreaControlSchema<Key extends SingleSchemaKey = SingleSchemaKey, Val = string>
  extends AbstractTextControlSchema<Key>,
  ElementControlEventListenerHolder<Val>,
  ElementControlEventObserverHolder<Val>,
  ElementPropertyHolder<HTMLTextAreaElement> {
  kind: 'text-area';
  /** The number of lines in the text field */
  rows?: number;
  /** Whether to adapt the content height */
  autosize?: boolean | { minRows: number, maxRows: number };
}

/**
 * @public
 */
export interface NumberFieldControlSchema<Key extends SingleSchemaKey = SingleSchemaKey, Val = number>
  extends AbstractInputBoxControlSchema<Key, Val>,
  ComponentControlEventListenerHolder<NzInputNumberComponent, Val>,
  ComponentControlEventObserverHolder<NzInputNumberComponent, Val>,
  ComponentPropertyHolder<NzInputNumberComponent> {
  kind: 'number-field';
  range?: { max?: number, min?: number };
  /** Decimal precision */
  precision?: number;
  /** Step length */
  step?: number;
  addons?: {
    before?: MaybeSchemaReactiveFn<NumberFieldControlSchema, string | TemplateRef<void> | null>;
    after?: MaybeSchemaReactiveFn<NumberFieldControlSchema, string | TemplateRef<void> | null>;
  };
  affixes?: {
    prefix?: MaybeSchemaReactiveFn<NumberFieldControlSchema, string | TemplateRef<void> | null>;
    suffix?: MaybeSchemaReactiveFn<NumberFieldControlSchema, string | TemplateRef<void> | null>;
  };
}

/**
 * @public
 */
export interface DatePickerControlSchema<Key extends SingleSchemaKey = SingleSchemaKey, Val = Date>
  extends AbstractDateControlSchema<Key, Val>,
  ComponentControlEventListenerHolder<NzDatePickerComponent, Val>,
  ComponentControlEventObserverHolder<NzDatePickerComponent, Val>,
  ComponentPropertyHolder<NzDatePickerComponent> {
  kind: 'date-picker';
}

/**
 * @public
 */
export interface DateRangePickerControlSchema<Key extends SchemaKey = SchemaKey, Val = [Date, Date]>
  extends AbstractDateControlSchema<Key, Val, [string, string]>,
  ComponentControlEventListenerHolder<NzRangePickerComponent, Val>,
  ComponentControlEventObserverHolder<NzRangePickerComponent, Val>,
  ComponentPropertyHolder<NzRangePickerComponent> {
  kind: 'date-range-picker';
  separator?: string;
}

/**
 * @public
 */
export interface TimePickerControlSchema<Key extends SingleSchemaKey = SingleSchemaKey, Val = Date>
  extends AbstractInputBoxControlSchema<Key, Val>,
  ComponentControlEventListenerHolder<NzTimePickerComponent, Val>,
  ComponentControlEventObserverHolder<NzTimePickerComponent, Val>,
  ComponentPropertyHolder<NzTimePickerComponent> {
  kind: 'time-picker';
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
  extends AbstractZorroControlSchema<Key, Val>,
  ComponentControlEventListenerHolder<NzSwitchComponent, Val>,
  ComponentControlEventObserverHolder<NzSelectComponent, Val>,
  ComponentPropertyHolder<NzSwitchComponent> {
  kind: 'toggle';
  /** Placeholder text */
  placeholder?: MaybeSchemaReactiveFn<ToggleControlSchema<Key, Val>, [string, string]>;
  size?: NzSizeDSType;
}

/**
 * @public
 */
export interface SelectControlSchema<Key extends SingleSchemaKey = SingleSchemaKey, Val = SafeAny | SafeAny[]>
  extends AbstractZorroControlSchema<Key, Val>,
  ComponentControlEventListenerHolder<NzSelectComponent, Val>,
  ComponentControlEventObserverHolder<NzSelectComponent, Val>,
  ComponentPropertyHolder<NzSelectComponent> {
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
  option?: string | TemplateRef<{ $implicit: SafeAny }>;
  options?: MaybeSchemaReactiveFn<SelectControlSchema<SingleSchemaKey, Val>, NzSelectOptionInterface[]>;
  fetchOptions?: (keyword$: Observable<string>, ctx: SchemaContext<SelectControlSchema<SingleSchemaKey, Val>>) => Observable<NzSelectOptionInterface[]>;
  compareWith?: (a: SafeAny, b: SafeAny) => boolean;
}

/**
 * @public
 */
export interface CascaderControlSchema<Key extends SchemaKey = SchemaKey, Val = SafeAny[]>
  extends AbstractZorroControlSchema<Key, Val>,
  ComponentControlEventListenerHolder<NzCascaderComponent, Val>,
  ComponentControlEventObserverHolder<NzCascaderComponent, Val>,
  ComponentPropertyHolder<NzCascaderComponent> {
  kind: 'cascader';
  /** Placeholder text */
  placeholder?: MaybeSchemaReactiveFn<CascaderControlSchema<Key, Val>, string>;
  placement?: NzCascaderPlacement;
  /** Show clean button */
  clearable?: boolean;
  changeOnSelect?: boolean;
  autofocus?: boolean;
  backdrop?: boolean;
  displayWith?: NzCascaderComponent['nzDisplayWith'];
  display?: NzCascaderComponent['nzLabelRender'];
  expandIcon?: string | TemplateRef<void>;
  suffixIcon?: string | TemplateRef<void>;
  arrow?: boolean;
  size?: NzCascaderSize;
  mode?: 'single' | 'multiple';
  /** Expand trigger for cascader control */
  trigger?: NzCascaderExpandTrigger;
  /** Support search, cannot be used with `options.load` */
  searchable?: boolean | NzShowSearchOptions;
  options?: MaybeSchemaReactiveFn<CascaderControlSchema<SingleSchemaKey, Val>, NzCascaderOption[]>;
  fetchOptions?: (
    node: NzCascaderOption,
    index: number,
    ctx: SchemaContext<CascaderControlSchema<SchemaKey, Val>>
  ) => PromiseLike<SafeAny> | Observable<SafeAny>;
}

/**
 * @public
 */
export interface SliderControlSchema<Key extends SchemaKey = SchemaKey, Val = number | [number, number]>
  extends AbstractZorroControlSchema<Key, Val>,
  ComponentControlEventListenerHolder<NzSliderComponent, Val>,
  ComponentControlEventObserverHolder<NzSliderComponent, Val>,
  ComponentPropertyHolder<NzSliderComponent> {
  kind: 'slider';
  /** Containment relationship */
  included?: boolean;
  /** range of value */
  range?: { max?: number, min?: number };
  /** slider type */
  type?: 'range' | 'single';
  /** Step length */
  step?: number;
  marks?: NzSliderComponent['nzMarks'];
  tip?: {
    formatter?: NzSliderComponent['nzTipFormatter'];
  };
  dots?: boolean;
  vertical?: boolean;
  reverse?: boolean;
}

/**
 * @public
 */
export interface RadioGroupControlSchema<Key extends SingleSchemaKey = SingleSchemaKey, Val = SafeAny>
  extends AbstractZorroControlSchema<Key, Val>,
  ComponentControlEventListenerHolder<NzRadioGroupComponent, Val>,
  ComponentControlEventObserverHolder<NzRadioGroupComponent, Val>,
  ComponentPropertyHolder<NzRadioGroupComponent> {
  kind: 'radio-group';
  size?: NzSizeLDSType;
  options: { label: string, value: SafeAny }[];
  variants?: {
    button?: NzRadioButtonStyle;
  };
}

/**
 * @public
 */
export interface CheckboxControlSchema<Key extends SingleSchemaKey = SingleSchemaKey, Val = boolean>
  extends AbstractZorroControlSchema<Key, Val>,
  ComponentControlEventListenerHolder<NzCheckboxComponent, Val>,
  ComponentControlEventObserverHolder<NzCheckboxComponent, Val>,
  ComponentPropertyHolder<NzCheckboxComponent> {
  kind: 'checkbox';
  content?: string;
  autofocus?: boolean;
  indeterminate?: boolean;
}

/**
 * @public
 */
export interface CheckboxGroupControlSchema<Key extends SingleSchemaKey = SingleSchemaKey, Val = number[] | string[]>
  extends AbstractZorroControlSchema<Key, Val>,
  ComponentControlEventListenerHolder<NzCheckboxGroupComponent, Val>,
  ComponentControlEventObserverHolder<NzCheckboxGroupComponent, Val>,
  ComponentPropertyHolder<NzCheckboxGroupComponent> {
  kind: 'checkbox-group';
  options: MaybeSchemaReactiveFn<SelectControlSchema<SingleSchemaKey, Val>, { label: string, value: number | string }[]>;
}

/**
 * @public
 */
export interface RateControlSchema<Key extends SingleSchemaKey = SingleSchemaKey, Val = number>
  extends AbstractZorroControlSchema<Key, Val>,
  ComponentControlEventListenerHolder<NzRateComponent, Val>,
  ComponentControlEventObserverHolder<NzRateComponent, Val>,
  ComponentPropertyHolder<NzRateComponent> {
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
  extends AbstractZorroControlSchema<Key, Val>,
  ComponentControlEventListenerHolder<NzTreeSelectComponent, Val>,
  ComponentControlEventObserverHolder<NzTreeSelectComponent, Val>,
  ComponentPropertyHolder<NzTreeSelectComponent> {
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

export interface TransferControlSchema<Key extends SingleSchemaKey = SingleSchemaKey, Val = SafeAny[]>
  extends AbstractZorroControlSchema<Key, Val>,
  ComponentControlEventListenerHolder<NzTransferComponent, Val>,
  ComponentControlEventObserverHolder<NzTransferComponent, Val>,
  ComponentPropertyHolder<NzTransferComponent> {
  kind: 'transfer';
  list?: string | TemplateRef<{ $implicit: SafeAny }>;
  footer?: string | TemplateRef<{ $implicit: SafeAny }>;
  option?: string | TemplateRef<{ $implicit: SafeAny }>;
  options: MaybeSchemaReactiveFn<TransferControlSchema<SingleSchemaKey, Val>, { label: string, value: SafeAny }[]>;
  titles: [string, string];
  operations: [string, string];
  listStyle?: undefined | null | Record<string, SafeAny>;
  searchable?: boolean;
  filter?: NzTransferComponent['nzFilterOption'];
  oneWay?: boolean;
}

export interface ColorPickerControlSchema<Key extends SingleSchemaKey = SingleSchemaKey, Val = string>
  extends AbstractZorroControlSchema<Key, Val>,
  ComponentControlEventListenerHolder<NzColorPickerComponent, Val>,
  ComponentControlEventObserverHolder<NzColorPickerComponent, Val>,
  ComponentPropertyHolder<NzColorPickerComponent> {
  kind: 'color-picker';
  format?: NzColorPickerComponent['nzFormat'];
  size?: NzColorPickerComponent['nzSize'];
  clearable?: boolean;
  trigger?: NzColorPickerComponent['nzTrigger'];
  showText?: boolean;
  alpha?: boolean;
  title?: string | TemplateRef<void>;
}

export interface SegmentedControlSchema<Key extends SingleSchemaKey = SingleSchemaKey, Val = number | string>
  extends AbstractZorroControlSchema<Key, Val>,
  ComponentControlEventListenerHolder<NzSegmentedComponent, Val>,
  ComponentControlEventObserverHolder<NzSegmentedComponent, Val>,
  ComponentPropertyHolder<NzSegmentedComponent> {
  kind: 'segmented';
  variants?: {
    block?: boolean;
  };
  options: MaybeSchemaReactiveFn<SegmentedControlSchema<SingleSchemaKey, Val>, NzSegmentedOptions>;
  size?: NzSizeLDSType;
}
