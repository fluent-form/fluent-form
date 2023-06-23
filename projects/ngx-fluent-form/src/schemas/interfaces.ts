import { TemplateRef } from '@angular/core';
import { AbstractControl, FormControlStatus } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzAlign, NzJustify, NzRowDirective } from 'ng-zorro-antd/grid';
import { ComponentOutputListenerMap, ComponentPropertyMap, HTMLElementEventListenerMap, HTMLElementPropertyMap } from '../types';
import { AnySchemaKey, Cell, StandardSchema } from './types';

export const enum SchemaType {
  Control,
  ControlContainer,
  ControlWrapper,
  Component,
  ComponentContainer,
  ComponentWrapper
}

export enum SchemaKind {
  Headless = 'headless',
  Input = 'input',
  Textarea = 'textarea',
  Number = 'number',
  Date = 'date',
  DateRange = 'date-range',
  Time = 'time',
  Toggle = 'toggle',
  Select = 'select',
  Cascader = 'cascader',
  Slider = 'slider',
  RadioGroup = 'radio-group',
  Checkbox = 'checkbox',
  CheckboxGroup = 'checkbox-group',
  Rate = 'rate',
  TreeSelect = 'tree-select',

  InputGroup = 'input-group',

  Group = 'group',
  Array = 'array',

  Template = 'template',
  Text = 'text',
  Button = 'button',

  ButtonGroup = 'button-group',

  Steps = 'steps',
  Step = 'step',
  Tabs = 'tabs',
  Tab = 'tab',
  Row = 'row'
}

export interface SchemaLike<Key extends AnySchemaKey = AnySchemaKey> {
  kind: string;
  key?: Key;
}

/** @internal */
interface Tooltip {
  title: string | TemplateRef<void>;
  icon: string | NzFormTooltipIcon;
}

/** @internal */
interface Label {
  value: string;
  span?: Cell;
  tooltip?: string | Tooltip;
}

/** 带标签的 */
export interface Labelful {
  label?: string | Label;
}

export interface Row {
  align?: NzAlign;
  justify?: NzJustify;
  gutter?: NzRowDirective['nzGutter'];
}

export interface Col {
  span?: Cell;
  offset?: Cell;
  flex?: number | string;
  push?: Cell;
  pull?: Cell;
  order?: number;
}

export interface ControlValueMapper<V> {
  /** A parser that maps from a model's value to a form control's value */
  parser: (value: SafeAny) => V | null;
  /** A formatter that maps from a form control's value to a model's value */
  formatter: (value: V | null) => SafeAny;
}

export interface SchemaContext<S extends SchemaLike> {
  schema: StandardSchema<S>;
  /** 如果当前没有对应的 control，会返回上一级的 control，这时候一般是 form group/array */
  control: AbstractControl;
  model: SafeAny;
}

/** 控件事件变更 */
type ControlEventChange<Val> = {
  valueChange?: (value: Val, control: AbstractControl) => void | Promise<void>;
  statusChange?: (status: FormControlStatus, control: AbstractControl) => void | Promise<void>;
}

/** 事件侦听器 */
export interface EventListenerHolder {
  listeners?: Record<string, undefined | ((...args: SafeAny[]) => void | Promise<void>)>
}

/** 控件事件侦听器 */
export interface ControlEventListenerHolder<V = SafeAny> extends EventListenerHolder {
  listeners?: ControlEventChange<V>;
}

/** 组件事件侦听器 */
export interface ComponentEventListenerHolder<C> extends EventListenerHolder {
  listeners?: ComponentOutputListenerMap<C>;
}

/** 组件控件事件侦听器 */
export interface ComponentControlEventListenerHolder<C, V = SafeAny> extends EventListenerHolder {
  listeners?: ComponentOutputListenerMap<C> & ControlEventChange<V>;
}

/** 元素事件侦听器 */
export interface ElementEventListenerHolder extends EventListenerHolder {
  listeners?: HTMLElementEventListenerMap;
}

/** 元素控件事件侦听器 */
export interface ElementControlEventListenerHolder<V = SafeAny> extends EventListenerHolder {
  listeners?: HTMLElementEventListenerMap & ControlEventChange<V>;
}

/** 属性修补器 */
export interface PropertyHolder {
  properties?: Record<string, SafeAny>
}

/** 组件属性修补器 */
export interface ComponentPropertyHolder<C> extends PropertyHolder {
  properties?: ComponentPropertyMap<C>;
}

/** 元素属性修补器 */
export interface ElementPropertyHolder<E extends HTMLElement> extends PropertyHolder {
  properties?: HTMLElementPropertyMap<E>;
}
