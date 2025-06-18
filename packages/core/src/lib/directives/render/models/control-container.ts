import { type Signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import type { AnyArray, AnyObject } from '@ngify/core';
import type { AbstractControlContainerSchema } from '../../../schemas';

export abstract class FluentControlContainer<T extends AnyObject | AnyArray> {
  abstract readonly schema: Signal<AbstractControlContainerSchema>;
  abstract readonly patchedSchema: Signal<AbstractControlContainerSchema>;
  abstract readonly form: Signal<FormGroup>;
  abstract readonly model: Signal<T>;
}
