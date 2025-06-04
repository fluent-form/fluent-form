import type { FormControlStatus } from '@angular/forms';
import type { SafeAny } from '@ngify/types';
import type { Observable } from 'rxjs';
import type { ComponentOutputMap } from '../types';
import type { SchemaContext } from './interfaces';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type ControlEventObserverMap<Val> = {
  valueChange?: (source: Observable<{ event: Val, context: SchemaContext }>) => Observable<SafeAny>;
  statusChange?: (source: Observable<{ event: FormControlStatus, context: SchemaContext }>) => Observable<SafeAny>;
};

type ComponentOutputObserverMap<C> = {
  [K in keyof ComponentOutputMap<C>]?: (source: Observable<{ event: ComponentOutputMap<C>[K], context: SchemaContext }>) => Observable<SafeAny>
};

type ElementEventObserverMap = {
  [K in keyof HTMLElementEventMap]?: (source: Observable<{ event: HTMLElementEventMap[K], context: SchemaContext }>) => Observable<SafeAny>
};

/** 事件侦听器 */
export interface EventObserverHolder {
  observers?: Partial<Record<string, ((source: Observable<SafeAny>) => Observable<SafeAny>)>>;
}

/** 控件事件侦听器 */
export interface ControlEventObserverHolder<V = SafeAny> extends EventObserverHolder {
  observers?: ControlEventObserverMap<V>;
}

/** 组件事件侦听器 */
export interface ComponentEventObserverHolder<C> extends EventObserverHolder {
  observers?: ComponentOutputObserverMap<C>;
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
