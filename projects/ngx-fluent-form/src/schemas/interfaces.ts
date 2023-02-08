import { TemplateRef } from '@angular/core';
import { AbstractControl, FormControlStatus } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { ComponentOutputListenerMap, ComponentPropertyMap, HTMLElementEventListenerMap, HTMLElementPropertyMap } from '../types';
import { Cell } from './types';

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

export interface Col {
  span?: Cell;
  offset?: Cell;
  flex?: number | string;
}

export interface CallbackArgs<S> {
  schema: S;
  /** 如果当前没有对应的 control，会返回上一级的 control，这时候一般是 form group/array */
  control: AbstractControl;
  model: SafeAny;
}

/** 控件事件变更 */
type ControlEventChange<Val> = {
  valueChange?: (value: Val) => void | Promise<void>;
  statusChange?: (status: FormControlStatus) => void | Promise<void>;
}

/** 抽象的输入字段 */
export interface AbstractInputField<Placeholder extends string | [string, string] = string> {
  placeholder?: Placeholder;
  autofocus?: boolean;
  readonly?: boolean | ((args: CallbackArgs<AbstractInputField<Placeholder>>) => boolean) | string;
  size?: NzSizeLDSType;
  borderless?: boolean;
}

/** 事件侦听器 */
export interface EventListener {
  listeners?: Record<string, undefined | ((event: SafeAny) => void | Promise<void>)>
}

/** 控件事件侦听器 */
export interface ControlEventListener<V = SafeAny> extends EventListener {
  listeners?: ControlEventChange<V>;
}

/** 组件事件侦听器 */
export interface ComponentEventListener<C> extends EventListener {
  listeners?: ComponentOutputListenerMap<C>;
}

/** 组件控件事件侦听器 */
export interface ComponentControlEventListener<C, V = SafeAny> extends EventListener {
  listeners?: ComponentOutputListenerMap<C> & ControlEventChange<V>;
}

/** 元素事件侦听器 */
export interface ElementEventListener extends EventListener {
  listeners?: HTMLElementEventListenerMap;
}

/** 元素控件事件侦听器 */
export interface ElementControlEventListener<V = SafeAny> extends EventListener {
  listeners?: HTMLElementEventListenerMap & ControlEventChange<V>;
}

/** 属性修补器 */
export interface PropertyPatcher {
  properties?: Record<string, SafeAny>
}

/** 组件属性修补器 */
export interface ComponentPropertyPatcher<C> extends PropertyPatcher {
  properties?: ComponentPropertyMap<C>;
}

/** 元素属性修补器 */
export interface ElementPropertyPatcher<E extends HTMLElement> extends PropertyPatcher {
  properties?: HTMLElementPropertyMap<E>;
}
