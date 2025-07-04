import type { AbstractControlOptions, AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import type { SafeAny } from '@ngify/core';
import type { AbstractSchema } from './abstract.schema';
import type { MaybeSchemaReactiveFn, SchemaReactiveFn } from './interfaces';
import type { EventListenerHolder } from './listeners';
import type { ControlValueMapper } from './mapper';
import type { EventObserverHolder } from './observers';
import type { PropertyHolder } from './properties';
import type { SchemaKey, SingleSchemaKey } from './types';

/**
 * Abstract representation of a real (concrete) control schema.
 */
export interface AbstractControlSchema<Key extends SchemaKey = SchemaKey, Val = SafeAny> extends AbstractSchema<Key> {
  id?: string;
  /** I/O mapper for control */
  mapper?: ControlValueMapper<Val>;
  /** Linkage control values */
  value?: SchemaReactiveFn<AbstractControlSchema, Val>;
  /* Used to set the default value of the control. */
  defaultValue?: SafeAny | Val;
  /** Is it a required control */
  required?: MaybeSchemaReactiveFn<AbstractControlSchema<SchemaKey, Val>, boolean>;
  /** Whether to disable control */
  disabled?: MaybeSchemaReactiveFn<AbstractControlSchema<SchemaKey, Val>, boolean>;
  /** Validator for the control */
  validators?: ValidatorFn[];
  /** Async validators for control */
  asyncValidators?: AsyncValidatorFn[];
  /** The event name for control to update upon. */
  updateOn?: AbstractControlOptions['updateOn'];
}

/**
 * @public
 */
export interface HeadlessControlSchema<Key extends SingleSchemaKey = SingleSchemaKey> extends AbstractControlSchema<Key> {
  kind: 'headless';
}

/**
 * @public
 */
export interface AbstractHeadfulControlSchema extends PropertyHolder, EventListenerHolder, EventObserverHolder {
  kind: 'headful';
  template: string;
}
