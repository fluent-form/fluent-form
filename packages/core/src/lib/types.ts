import { EventEmitter, OutputRef, Signal } from '@angular/core';
import { PickProperty, SafeAny } from '@ngify/types';

/**
 * HTML 元素的属性对象
 */
export type HTMLElementPropertyMap<E extends HTMLElement> = Partial<PickProperty<E>>;

/**
 * 组件的 Ouput 名
 * ```ts
 * nzChange | nzVisibleChange
 * ```
 * @template C 组件的类类型
 */
type ComponentOutputName<C> = Exclude<
  { [K in keyof C]: C[K] extends EventEmitter<SafeAny> | OutputRef<SafeAny> ? K : never }[keyof C],
  undefined
>;

/**
 * 组件的输出对象
 * ```ts
 * { nzChange: EventType, ... }
 * ```
 * @template C 组件的类类型
 * @template S 各种控件的图示
 */
export type ComponentOutputMap<C> = {
  [K in ComponentOutputName<C>]?: C[K] extends EventEmitter<infer E> | OutputRef<infer E> ? E : never
}

/**
 * 组件类属性
 * ```ts
 * { nzValue: string, other: unknown, ... }
 * ```
 * @template C 组件的类类型
 */
export type ComponentPropertyMap<C> = {
  [K in keyof Omit<C, ComponentOutputName<C>>]?: C[K] extends Signal<infer S> ? S : C[K]
}

export type Stringify<T> = T extends number ? `${T}` : never;

export type Indexable<T> = T & Record<string, SafeAny>;
