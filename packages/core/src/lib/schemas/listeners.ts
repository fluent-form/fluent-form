import { FormControlStatus } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import { ComponentOutputListenerMap, HTMLElementEventListenerMap } from '../types';
import { SchemaContext } from './interfaces';

/** 控件事件 */
type ControlEventMap<Val> = {
  valueChange?: (value: Val, ctx: SchemaContext) => void | Promise<void>;
  statusChange?: (status: FormControlStatus, ctx: SchemaContext) => void | Promise<void>;
}

/** 事件侦听器 */
export interface EventListenerHolder {
  listeners?: Record<string, undefined | ((...args: SafeAny[]) => void | Promise<void>)>
}

/** 控件事件侦听器 */
export interface ControlEventListenerHolder<V = SafeAny> extends EventListenerHolder {
  listeners?: ControlEventMap<V>;
}

/** 组件事件侦听器 */
export interface ComponentEventListenerHolder<C> extends EventListenerHolder {
  listeners?: ComponentOutputListenerMap<C>;
}

/** 组件控件事件侦听器 */
export interface ComponentControlEventListenerHolder<C, V = SafeAny> extends EventListenerHolder {
  listeners?: ComponentOutputListenerMap<C> & ControlEventMap<V>;
}

/** 元素事件侦听器 */
export interface ElementEventListenerHolder extends EventListenerHolder {
  listeners?: HTMLElementEventListenerMap;
}

/** 元素控件事件侦听器 */
export interface ElementControlEventListenerHolder<V = SafeAny> extends EventListenerHolder {
  listeners?: HTMLElementEventListenerMap & ControlEventMap<V>;
}
