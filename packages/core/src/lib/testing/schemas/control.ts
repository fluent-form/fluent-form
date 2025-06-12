import type { SafeAny } from '@ngify/core';
import type {
  AbstractControlSchema,
  AbstractHeadfulControlSchema,
  ComponentControlEventListenerHolder,
  ComponentControlEventObserverHolder,
  ComponentPropertyHolder,
  ElementControlEventListenerHolder,
  ElementControlEventObserverHolder,
  ElementPropertyHolder,
  SchemaKey,
  SingleSchemaKey
} from '../../schemas';
import { NumberComponent, RangeComponent } from '../components';

/**
 * @public
 */
export interface HeadfulControlSchema<Key extends SingleSchemaKey = SingleSchemaKey>
  extends AbstractControlSchema<Key, SafeAny>, AbstractHeadfulControlSchema {
  kind: 'headful';
}

/**
 * @public
 */
export interface TextFieldControlSchema<Key extends SingleSchemaKey = SingleSchemaKey, Val = string>
  extends AbstractControlSchema<Key, Val>,
  ElementControlEventListenerHolder<Val>,
  ElementControlEventObserverHolder<Val>,
  ElementPropertyHolder<HTMLInputElement> {
  kind: 'text-field';
  type?: 'text' | 'number' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'color';
  placeholder?: string;
}

export interface RangeControlSchema<Key extends SchemaKey = SchemaKey, Val = [number, number]>
  extends AbstractControlSchema<Key, Val>,
  ComponentControlEventListenerHolder<RangeComponent, Val>,
  ComponentControlEventObserverHolder<RangeComponent, Val>,
  ComponentPropertyHolder<RangeComponent> {
  kind: 'range';
  min?: number;
  max?: number;
}

export interface NumberFieldControlSchema<Key extends SchemaKey = SchemaKey, Val = number>
  extends AbstractControlSchema<Key, Val>,
  ComponentControlEventListenerHolder<NumberComponent, Val>,
  ComponentControlEventObserverHolder<NumberComponent, Val>,
  ComponentPropertyHolder<NumberComponent> {
  kind: 'number-field';
}
