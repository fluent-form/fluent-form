import type { FormControlStatus } from '@angular/forms';
import type { SafeAny } from '@ngify/types';
import type { ComponentOutputMap } from '../types';
import type { SchemaContext } from './interfaces';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type ControlEventListenerMap<Val> = {
  valueChange?: (value: Val, context: SchemaContext) => void;
  statusChange?: (status: FormControlStatus, context: SchemaContext) => void;
};

type ComponentOutputListenerMap<C> = {
  [K in keyof ComponentOutputMap<C>]?: (value: ComponentOutputMap<C>[K], context: SchemaContext) => void
};

type ElementEventListenerMap = {
  [K in keyof HTMLElementEventMap]?: (event: HTMLElementEventMap[K], ctx: SchemaContext) => void
};

/** 事件侦听器 */
export interface EventListenerHolder {
  listeners?: Partial<Record<string, ((...args: SafeAny[]) => SafeAny)>>;
}

/** 控件事件侦听器 */
export interface ControlEventListenerHolder<V = SafeAny> extends EventListenerHolder {
  listeners?: ControlEventListenerMap<V>;
}

/** 组件事件侦听器 */
export interface ComponentEventListenerHolder<C> extends EventListenerHolder {
  listeners?: ComponentOutputListenerMap<C>;
}

/** 组件控件事件侦听器 */
export interface ComponentControlEventListenerHolder<C, V = SafeAny> extends EventListenerHolder {
  listeners?: ComponentOutputListenerMap<C> & ControlEventListenerMap<V>;
}

/** 元素事件侦听器 */
export interface ElementEventListenerHolder extends EventListenerHolder {
  listeners?: ElementEventListenerMap;
}

/** 元素控件事件侦听器 */
export interface ElementControlEventListenerHolder<V = SafeAny> extends EventListenerHolder {
  listeners?: ElementEventListenerMap & ControlEventListenerMap<V>;
}
