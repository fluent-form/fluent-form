import { Directive, type Signal, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import type { AnyArray, AnyObject } from '@ngify/types';
import type { AbstractControlContainerSchema } from '../../../schemas';
import { SchemaUtil } from '../../../utils';
import type { FluentOutletDirective } from '../outlet.directive';

export abstract class FluentControlContainer<T extends AnyObject | AnyArray> {
  abstract readonly schema: Signal<AbstractControlContainerSchema>;
  abstract readonly patchedSchema: Signal<AbstractControlContainerSchema>;
  abstract readonly form: Signal<FormGroup>;
  abstract readonly model: Signal<T>;

  /** The directive of the current container. */
  abstract get directive(): FluentControlContainerDirective<T>;
}

@Directive()
export abstract class FluentControlContainerDirective<T extends AnyObject | AnyArray> extends FluentControlContainer<T> {
  protected readonly schemaUtil = inject(SchemaUtil);
  protected readonly outlets: FluentOutletDirective<T>[] = [];

  /** @internal */
  get directive(): FluentControlContainerDirective<T> {
    return this;
  }

  addOutlet(outlet: FluentOutletDirective<T>) {
    this.outlets.push(outlet);
  }

  updateOutlet(outlet: FluentOutletDirective<T>) {
    const schema = this.schemaUtil.find(this.patchedSchema(), outlet.key);
    if (schema) {
      outlet.control = this.form().get(outlet.key.toString()) ?? this.form();
      outlet.schema = schema;
    }
  }

  removeOutlet(outlet: FluentOutletDirective<T>) {
    const index = this.outlets.indexOf(outlet);
    this.outlets.splice(index, 1);
  }
}
