import type { SafeAny } from '@ngify/types';
import type { ComponentPropertyMap, HTMLElementPropertyMap } from '../types';

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
