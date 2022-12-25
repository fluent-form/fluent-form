import { Directive, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { takeUntil } from 'rxjs';
import { group } from '../builders';
import { AnySchema, FormGroupSchema } from '../schemas';
import { AnyArray, AnyObject } from '../types';
import { createFormGroup, formUtils, FormUtils, modelUtils, standardSchema } from '../utils';
import { ControlContainer, ControlContainerDirective } from './models/control-container';

@Directive({
  selector: '[fluentForm]',
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
  private immutableModel!: T;
  private _model!: T;
  /** @internal */
  schema!: FormGroupSchema;
  /** @internal */
  form!: UntypedFormGroup;

  get schemas(): AnySchema[] {
    return this.schema?.schemas as AnySchema[];
  }

  @Input('fluentForm')
  set schemas(value: AnySchema[] | FormGroupSchema) {
    this.schema && this.destroy$.next();

    // 这里统一包装为 FormGroupSchema
    this.schema = standardSchema(
      Array.isArray(value) ? group().schemas(...value) : value
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
    if (this.model !== this.immutableModel) {
      this.form && modelUtils(this.model as AnyObject, this.schemas).assign(this.form);
    }
  }

  @Output('fluentModelChange') modelChange: EventEmitter<T> = new EventEmitter();

  /** @internal */
  get directive(): ControlContainerDirective<T> {
    return this;
  }

  constructor(private destroy$: NzDestroyService) {
    super();
  }

  /**
   * 更新模型
   * @param utils
   */
  private onValueChanges(utils: FormUtils<UntypedFormGroup | UntypedFormArray>) {
    utils.change(this.immutableModel = utils.assign({} as T));
    this.modelChange.emit(this.immutableModel);
  }
}
