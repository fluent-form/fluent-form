import { SafeAny } from '@ngify/types';
import { AbstractControlSchema, AbstractHeadlessControlSchema, ComponentEventListenerHolder, ComponentPropertyHolder, ElementControlEventListenerHolder, ElementPropertyHolder, SchemaKey, SingleSchemaKey } from '../../schemas';
import { RangeComponent } from '../components';
import { NumberComponent } from '../components/number/number.component';

/**
 * @public
 */
export interface HeadlessControlSchema<Key extends SingleSchemaKey = SingleSchemaKey> extends AbstractControlSchema<Key, SafeAny>, AbstractHeadlessControlSchema {
  kind: 'headless';
}

/**
 * @public
 */
export interface TextControlSchema<Key extends SingleSchemaKey = SingleSchemaKey, Val = string>
  extends AbstractControlSchema<Key, Val>, ElementControlEventListenerHolder<Val>, ElementPropertyHolder<HTMLInputElement> {
  kind: 'text';
  type?: 'text' | 'number' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'color';
  placeholder?: string;
}

export interface RangeControlSchema<Key extends SchemaKey = SchemaKey, Val = [number, number]>
  extends AbstractControlSchema<Key, Val>, ComponentEventListenerHolder<Val>, ComponentPropertyHolder<RangeComponent> {
  kind: 'range';
  min?: number;
  max?: number;
}

export interface NumberControlSchema<Key extends SchemaKey = SchemaKey, Val = number>
  extends AbstractControlSchema<Key, Val>, ComponentEventListenerHolder<Val>, ComponentPropertyHolder<NumberComponent> {
  kind: 'number';
}
