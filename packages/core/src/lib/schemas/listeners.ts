import type { FormControlStatus } from '@angular/forms';
import type { SafeAny } from '@ngify/core';
import type { ComponentOutputMap } from '../types';
import type { SchemaContext } from './interfaces';

export interface ListenerContext extends SchemaContext {
  element: HTMLElement;
  component: unknown;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type ControlEventListenerMap<Val> = {
  valueChange?: (value: Val, context: ListenerContext) => void;
  statusChange?: (status: FormControlStatus, context: ListenerContext) => void;
};

type ComponentOutputListenerMap<C> = {
  [K in keyof ComponentOutputMap<C>]?: (value: ComponentOutputMap<C>[K], context: ListenerContext) => void
};

type ElementEventListenerMap = {
  [K in keyof HTMLElementEventMap]?: (event: HTMLElementEventMap[K], context: ListenerContext) => void
};

/** 事件侦听器 */
export interface EventListenerHolder {
  listeners?: Partial<Record<string, ((event: SafeAny, context: ListenerContext) => SafeAny)>>;
}

/** 控件事件侦听器 */
export interface ControlEventListenerHolder<V = SafeAny> extends EventListenerHolder {
  listeners?: ControlEventListenerMap<V> & ElementEventListenerMap;
}

/** 组件事件侦听器 */
export interface ComponentEventListenerHolder<C> extends EventListenerHolder {
  listeners?: ComponentOutputListenerMap<C> & ElementEventListenerMap;
}

/** 组件控件事件侦听器 */
export interface ComponentControlEventListenerHolder<C, V = SafeAny> extends EventListenerHolder {
  listeners?: ComponentOutputListenerMap<C> & ControlEventListenerMap<V> & ElementEventListenerMap;
}

/** 元素事件侦听器 */
export interface ElementEventListenerHolder extends EventListenerHolder {
  listeners?: ElementEventListenerMap;
}

/** 元素控件事件侦听器 */
export interface ElementControlEventListenerHolder<V = SafeAny> extends EventListenerHolder {
  listeners?: ElementEventListenerMap & ControlEventListenerMap<V>;
}
