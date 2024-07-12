import { AbstractControl, FormControlStatus } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import { FluentColDirective, FluentRowDirective } from '../directives';
import { ComponentOutputListenerMap, ComponentPropertyMap, HTMLElementEventListenerMap, HTMLElementPropertyMap } from '../types';
import { AbstractSchema } from './abstract.schema';
import { AbstractControlSchema } from './control.schema';
import { SchemaKey } from './types';

/**
 * @public
 */
export enum SchemaType {
  Control,
  ControlGroup,
  ControlArray,
  ControlWrapper,
  Component,
  ComponentContainer,
  ComponentWrapper
}

export const enum SchemaKind {
  Headless = 'headless',
  Template = 'template',
  Row = 'row'
}

export interface SchemaLike<Key extends SchemaKey = SchemaKey> {
  kind: string;
  key?: Key;
}

export interface Row {
  align?: FluentRowDirective['align'];
  justify?: FluentRowDirective['justify'];
  gap?: FluentRowDirective['gap'];
}

export interface Column {
  span?: FluentColDirective['span'];
  offset?: FluentColDirective['offset'];
  flex?: FluentColDirective['flex'];
}

export interface ControlValueMapper<V> {
  /** A parser that maps from a model's value to a form control's value */
  parser: (input: SafeAny, schema: AbstractControlSchema) => V | null;
  /** A formatter that maps from a form control's value to a model's value */
  formatter: (output: V | null, schema: AbstractControlSchema) => SafeAny;
}

export interface SchemaContext<S extends SchemaLike = AbstractSchema> {
  schema: S;
  /** 如果当前没有对应的 control，会返回上一级的 control，这时候一般是 form group/array */
  control: AbstractControl;
  model: SafeAny;
}

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

/** 属性修补器 */
export interface PropertyHolder {
  properties?: Record<string, SafeAny>
}

/** 组件属性修补器 */
export interface ComponentPropertyHolder<C> extends PropertyHolder {
  properties?: ComponentPropertyMap<C>;
}

/** 元素属性修补器 */
export interface ElementPropertyHolder<E extends HTMLElement> extends PropertyHolder {
  properties?: HTMLElementPropertyMap<E>;
}

export type Length = number | { max?: number, min?: number };

export type SchemaReactiveFn<S extends AbstractSchema, R> = (ctx: SchemaContext<S>) => R;

export type MaybeSchemaReactiveFn<S extends AbstractSchema, R> = R | SchemaReactiveFn<S, R>;

export type WithoutSchemaReactiveFn<T extends MaybeSchemaReactiveFn<AbstractSchema, SafeAny>> = Exclude<T, SchemaReactiveFn<SafeAny, SafeAny>>;
