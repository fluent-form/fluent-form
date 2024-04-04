import { EventEmitter } from '@angular/core';
import { PickProperty, SafeAny } from '@ngify/types';
import { SchemaContext } from './schemas';

/**
 * HTML 元素的事件侦听器对象
 * ```ts
 * { click: (event, schema) => void, ... }
 * ```
 */
export type HTMLElementEventListenerMap = {
  [K in keyof HTMLElementEventMap]?: (event: HTMLElementEventMap[K], ctx: SchemaContext) => SafeAny
};

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
  { [K in keyof C]: C[K] extends EventEmitter<SafeAny> ? K : never }[keyof C],
  undefined
>;

/**
 * 组件的事件侦听器对象
 * ```ts
 * { nzChange: (event) => void, ... }
 * ```
 * @template C 组件的类类型
 * @template S 各种控件的图示
 */
export type ComponentOutputListenerMap<C> = {
  [K in ComponentOutputName<C>]?: (event: C[K] extends EventEmitter<infer E> ? E : never, ctx: SchemaContext) => SafeAny
}

/**
 * 组件类属性
 * ```ts
 * { nzValue: string, other: unknown, ... }
 * ```
 * @template C 组件的类类型
 */
export type ComponentPropertyMap<C> = Partial<Omit<C, ComponentOutputName<C>>>;

export type Stringify<T> = T extends number ? `${T}` : never;

export type Indexable<T> = T & Record<string, SafeAny>;
