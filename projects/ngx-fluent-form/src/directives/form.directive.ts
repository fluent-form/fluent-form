import { Directive, EventEmitter, forwardRef, inject, Input, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { AnyArray, AnyObject } from '@ngify/types';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { takeUntil } from 'rxjs';
import { AnySchema, FormGroupSchema } from '../schemas';
import { StandardSchema } from '../schemas/types';
import { createFormGroup, formUtils, FormUtils, modelUtils, standardSchema } from '../utils';
import { ControlContainer, ControlContainerDirective } from './models/control-container';

@Directive({
  // eslint-disable-next-line
  selector: '[fluent-form]',
  exportAs: 'fluentForm',
  standalone: true,
  providers: [
    NzDestroyService,
    {
      provide: ControlContainer,
      useExisting: forwardRef(() => FluentFormDirective)
    }
  ]
})
export class FluentFormDirective<T extends AnyObject | AnyArray> extends ControlContainerDirective<T> {
  private readonly destroy$ = inject(NzDestroyService);
  private internalModel!: T;
  private _model!: T;
  private schema!: StandardSchema<FormGroupSchema>;
  /** @internal */
  form!: FormGroup;

  get schemas(): StandardSchema<AnySchema>[] {
    return this.schema?.schemas;
  }

  @Input('fluentSchemas')
  set schemas(value: AnySchema[] | FormGroupSchema) {
    this.schema && this.destroy$.next();

    // 这里统一包装为 FormGroupSchema
    this.schema = standardSchema(
      Array.isArray(value) ? { kind: 'group', schemas: value } : value
    );

    this.formChange.emit(this.form = createFormGroup(this.schema));

    this.directives.forEach(directive => this.assignDirective(directive));

    const utils = formUtils(this.form, this.schemas);
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.onValueChanges(utils);
    });

    this.model && modelUtils(this.model as AnyObject, this.schemas).assign(this.form);
  }

  get model(): T {
    return this._model;
  }

  /** 模型 */
  @Input('fluentModel')
  set model(value: T) {
    this._model = value;

    // 如果是外部变更，就赋值到表单
    if (this.model !== this.internalModel) {
      this.form && modelUtils(this.model as AnyObject, this.schemas).assign(this.form);
    }
  }

  @Output('fluentModelChange') modelChange: EventEmitter<T> = new EventEmitter();

  /** @internal */
  get directive(): ControlContainerDirective<T> {
    return this;
  }

  /**
   * 更新模型
   * @param utils
   */
  private onValueChanges(utils: FormUtils<FormGroup | FormArray>) {
    utils.change(this.internalModel = utils.assign({} as T));
    this.modelChange.emit(this.internalModel);
  }
}
