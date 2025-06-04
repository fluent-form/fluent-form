import type { EventEmitter, OutputRef, Signal } from '@angular/core';
import type { PickProperty, SafeAny } from '@ngify/types';

/**
 * Attribute map for HTML elements.
 */
export type HTMLElementPropertyMap<E extends HTMLElement> = Partial<PickProperty<E>>;

/**
 * The name of the component's `Output`
 * ```ts
 * nzChange | nzVisibleChange
 * ```
 * @template C The component's class type
 */
type ComponentOutputName<C> = Exclude<
  { [K in keyof C]: C[K] extends EventEmitter<SafeAny> | OutputRef<SafeAny> ? K : never }[keyof C],
  undefined
>;

/**
 * The output object of the component
 * ```ts
 * { nzChange: EventType, ... }
 * ```
 * @template C The component's class type
 * @template S The schemas of various controls
 */
export type ComponentOutputMap<C> = {
  [K in ComponentOutputName<C>]?: C[K] extends EventEmitter<infer E> | OutputRef<infer E> ? E : never
};

/**
 * Component class properties
 * ```ts
 * { nzValue: string, other: unknown, ... }
 * ```
 * @template C The component's class type
 */
export type ComponentPropertyMap<C> = {
  [K in keyof Omit<C, ComponentOutputName<C>>]?: C[K] extends Signal<infer S> ? S : C[K]
};

export type Stringify<T> = T extends number ? `${T}` : never;

export type Indexable<T> = T & Record<string, SafeAny>;
