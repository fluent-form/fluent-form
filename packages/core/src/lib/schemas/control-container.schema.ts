import { AbstractControlOptions, AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import { AbstractBranchSchema } from './abstract.schema';
import { ControlEventListenerHolder, Row } from './interfaces';
import { SingleSchemaKey } from './types';

/**
 * @public
 * 抽象的容器控件图示
 */
export interface AbstractControlContainerSchema<Key extends SingleSchemaKey = SingleSchemaKey> extends AbstractBranchSchema<Key>, ControlEventListenerHolder<SafeAny>, Row {
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
export interface AbstractFormGroupSchema<Key extends SingleSchemaKey = SingleSchemaKey> extends AbstractControlContainerSchema<Key> {
  kind: 'group';
}
