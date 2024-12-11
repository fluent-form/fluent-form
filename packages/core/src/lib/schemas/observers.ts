import { FormControlStatus } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import { Observable } from 'rxjs';
import { ComponentOutputMap } from '../types';
import { SchemaContext } from './interfaces';

type ControlEventObserverMap<Val> = {
  valueChange?: (source: Observable<{ event: Val, context: SchemaContext }>) => void;
  statusChange?: (source: Observable<{ event: FormControlStatus, context: SchemaContext }>) => void;
}

type ComponentOutputObserverMap<C> = {
  [K in keyof ComponentOutputMap<C>]?: (source: Observable<{ event: ComponentOutputMap<C>[K], context: SchemaContext }>) => void
}

type ElementEventObserverMap = {
  [K in keyof HTMLElementEventMap]?: (source: Observable<{ event: HTMLElementEventMap[K], ctx: SchemaContext }>) => void
};

/** 事件侦听器 */
export interface EventObserverHolder {
  observers?: Partial<Record<string, ((source: Observable<SafeAny>) => void)>>
}

/** 控件事件侦听器 */
export interface ControlEventObserverHolder<V = SafeAny> extends EventObserverHolder {
  observers?: ControlEventObserverMap<V>;
}

/** 组件事件侦听器 */
export interface ComponentEventObserverHolder<C> extends EventObserverHolder {
  observers?: ComponentOutputObserverMap<C>
}

/** 组件控件事件侦听器 */
export interface ComponentControlEventObserverHolder<C, V = SafeAny> extends EventObserverHolder {
  observers?: ComponentOutputObserverMap<C> & ControlEventObserverMap<V>;
}

/** 元素事件侦听器 */
export interface ElementEventObserverHolder extends EventObserverHolder {
  observers?: ElementEventObserverMap;
}

/** 元素控件事件侦听器 */
export interface ElementControlEventObserverHolder<V = SafeAny> extends EventObserverHolder {
  observers?: ElementEventObserverMap & ControlEventObserverMap<V>;
}
