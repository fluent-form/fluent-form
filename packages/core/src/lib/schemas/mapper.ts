import type { SafeAny } from '@ngify/types';
import type { AbstractControlSchema } from './control.schema';

export interface ControlValueMapper<V> {
  /** A parser that maps from a model's value to a form control's value */
  parser: (value: SafeAny | null, schema: AbstractControlSchema) => V | null;
  /** A formatter that maps from a form control's value to a model's value */
  formatter: (value: V | null, schema: AbstractControlSchema) => SafeAny | null;
}
