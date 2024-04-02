import { Directive, inject } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { AnyArray, AnyObject } from '@ngify/types';
import { AnyContainerSchema } from '../../../schemas';
import { SchemaUtil } from '../../../utils';
import { FluentOutletDirective } from '../outlet.directive';

/**
 * 抽象的控件容器
 */
export abstract class FluentControlContainer<T extends AnyObject | AnyArray> {
  /** 当前图示 */
  abstract schema: AnyContainerSchema;
  /** 当前表单 */
  abstract form: AbstractControl;
  /** 当前模型 */
  abstract model: T;

  /** 当前容器的指令 */
  abstract get directive(): FluentControlContainerDirective<T>;
}

@Directive()
export abstract class FluentControlContainerDirective<T extends AnyObject | AnyArray> extends FluentControlContainer<T> {
  protected readonly schemaUtil = inject(SchemaUtil);
  protected outlets: FluentOutletDirective<T>[] = [];

  /** @internal */
  get directive(): FluentControlContainerDirective<T> {
    return this;
  }

  addOutlet(outlet: FluentOutletDirective<T>) {
    this.outlets.push(outlet);
  }

  updateOutlet(outlet: FluentOutletDirective<T>) {
    const schema = this.schemaUtil.find(this.schema, outlet.key);
    if (schema) {
      outlet.control = this.form.get(outlet.key.toString()) ?? this.form;
      outlet.schema = schema;
    }
  }

  removeOutlet(outlet: FluentOutletDirective<T>) {
    const index = this.outlets.indexOf(outlet);
    this.outlets.splice(index, 1);
  }
}
