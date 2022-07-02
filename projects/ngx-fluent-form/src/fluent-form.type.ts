import { EventEmitter } from '@angular/core';
import { Property, SafeAny } from '@ngify/types';

/**
 * HTML 元素的事件侦听器对象
 * ```ts
 * { click: (event, schema) => void, ... }
 * ```
 * @template S 各种控件的图示
 */
export type HTMLElementEventListenerMap = {
  [K in keyof HTMLElementEventMap]?: (event: HTMLElementEventMap[K]) => void
};

/**
 * 组件的事件名
 * @template C 组件的类类型
 */
type ComponentEventName<C> = Exclude<{
  [K in keyof C]: C[K] extends EventEmitter<SafeAny> ? K : never
}[keyof C], undefined>;

/**
 * 组件的事件侦听器对象
 * ```ts
 * { nzChange: (event, schema) => void, ... }
 * ```
 * @template C 组件的类类型
 * @template S 各种控件的图示
 */
export type ComponentEventListenerMap<C> = {
  [K in ComponentEventName<C>]?: (event: C[K] extends EventEmitter<infer E> ? E : never) => void
}

/**
 * 组件属性的联合类型
 * @template C 组件的类类型
 */
type ComponentProperty<C> = Omit<Property<C>, ComponentEventName<C>>;

/**
 * NZ 组件的 @Input 名字的联合类型
 * @template C 组件的类类型
 */
type ComponentInputName<C> = Extract<keyof ComponentProperty<C>, `nz${Capitalize<string>}`>;

/**
 * NZ 组件的 Input Map
 * @template C 组件的类类型
 */
export type ComponentInput<C> = Partial<{ [P in ComponentInputName<C>]: C[P] }>;
