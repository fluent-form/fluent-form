import { EventEmitter } from '@angular/core';
import { Property, SafeAny } from '@ngify/types';

/**
 * HTML 元素的事件侦听器对象
 * ```ts
 * { click: (event, schema) => void, ... }
 * ```
 */
export type HTMLElementEventListenerMap = {
  [K in keyof HTMLElementEventMap]?: (event: HTMLElementEventMap[K]) => void
};

/**
 * HTML 元素的属性对象
 */
export type HTMLElementPropertyMap<E extends HTMLElement> = Partial<WritableMap<Property<E>>>;

/**
 * 组件的 Ouput 名
 * ```ts
 * nzChange | nzVisibleChange
 * ```
 * @template C 组件的类类型
 */
type ComponentOutputName<C> = Exclude<{
  [K in keyof C]: C[K] extends EventEmitter<SafeAny> ? K : never
}[keyof C], undefined>;

/**
 * 组件的事件侦听器对象
 * ```ts
 * { nzChange: (event) => void, ... }
 * ```
 * @template C 组件的类类型
 * @template S 各种控件的图示
 */
export type ComponentOutputListenerMap<C> = {
  [K in ComponentOutputName<C>]?: (event: C[K] extends EventEmitter<infer E> ? E : never) => void
}

/**
 * 组件类属性
 * ```ts
 * { nzValue: string, other: unknown, ... }
 * ```
 * @template C 组件的类类型
 */
type ComponentProperty<C> = Omit<Property<C>, ComponentOutputName<C>>;

/**
 * NZ 组件的 Input 名字
 * ```ts
 * nzValue | nzStatus
 * ```
 * @template C 组件的类类型
 */
type ComponentInputName<C> = Extract<keyof ComponentProperty<C>, `nz${Capitalize<string>}`>;

/**
 * NZ 组件的 Input Map
 * ```ts
 * { nzValue: string, nzStatus: string, ... }
 * ```
 * @template C 组件的类类型
 */
export type ComponentInputMap<C> = Partial<{ [P in ComponentInputName<C>]: C[P] }>;

/**
 * 必填单个属性或者全部属性
 * ```
 * SingleOrAll<{ a: string, b: number }> -> { a: string } | { b: number } | { a: string, b: number }
 * ```
 */
export type SingleOrAll<T> = { [P in keyof T]: { [K in P]-?: T[P] } }[keyof T] | Required<T>;

type IfEquals<X, Y, T = X, F = never> =
  (<T>() => T extends X ? true : false) extends
  (<T>() => T extends Y ? true : false) ? T : F;

/**
 * 过滤出可写的键值对
 */
type WritableMap<T> = {
  [P in keyof T]-?: IfEquals<{ [K in P]: T[P] }, { -readonly [K in P]: T[P] }>
};

/** Any Object */
export type Obj = Record<string, unknown>;
/** Any Array */
export type Arr = unknown[];