import { AbstractControlOptions, AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import { AbstractSchema } from './abstract.schema';
import { MaybeSchemaReactiveFn, SchemaReactiveFn } from './interfaces';
import { ControlValueMapper } from './mapper';
import { PropertyHolder } from './properties';
import { SchemaKey, SingleSchemaKey } from './types';

/**
 * @public
 * 抽象的真实控件图示
 */
export interface AbstractControlSchema<Key extends SchemaKey = SchemaKey, Val = SafeAny> extends AbstractSchema<Key> {
  id?: string;
  /** I/O mapper for control */
  mapper?: ControlValueMapper<Val>;
  /** Linkage control values */
  value?: SchemaReactiveFn<AbstractControlSchema, Val>
  /* Used to set the default value of the control. */
  defaultValue?: SafeAny;
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
export interface AbstractHeadedControlSchema extends PropertyHolder {
  kind: 'headed';
  template: string;
}
