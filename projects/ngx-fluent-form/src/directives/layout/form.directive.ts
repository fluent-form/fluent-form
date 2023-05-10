import { Directive, EventEmitter, forwardRef, inject, Input, Output } from '@angular/core';
import { FormControlStatus, FormGroup } from '@angular/forms';
import { AnyArray, AnyObject } from '@ngify/types';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { skip, takeUntil } from 'rxjs';
import { AnySchema, FormGroupSchema } from '../../schemas';
import { StandardSchema } from '../../schemas/types';
import { createFormGroup, FormUtil, ModelUtil, standardSchema } from '../../utils';
import { ControlContainerDirective, FluentControlContainer } from './models/control-container';

@Directive({
  // eslint-disable-next-line
  selector: '[fluent-form]',
  exportAs: 'fluentForm',
  standalone: true,
  providers: [
    NzDestroyService,
    {
      provide: FluentControlContainer,
      useExisting: forwardRef(() => FluentFormDirective)
    }
  ]
})
export class FluentFormDirective<T extends AnyObject | AnyArray> extends ControlContainerDirective<T> {
  private readonly destroy$ = inject(NzDestroyService);
  private readonly formUtil = inject(FormUtil);
  private readonly modelUtil = inject(ModelUtil);
  /**
   * 内部的不可变模型，主要有以下用途：
   * - 用来跟公开的模型值进行引用比较，判断变更是内部发出的还是外部传入的，如果引用一致则为内部变更
   */
  private internalModel!: T;
  private _model!: T;
  private schema!: StandardSchema<FormGroupSchema>;

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

    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.onValueChanges();
    });

    this.model && this.modelUtil.updateForm(this.model, this.schemas, this.form);

    this.form.valueChanges.pipe(
      skip(1),
      takeUntil(this.destroy$)
    ).subscribe(o =>
      this.valueChanges.emit(o)
    );

    this.form.statusChanges.pipe(
      skip(1),
      takeUntil(this.destroy$)
    ).subscribe(o =>
      this.statusChanges.emit(o)
    );
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
      this.form && this.modelUtil.updateForm(this.model, this.schemas, this.form);
    }
  }

  @Output('fluentModelChange') modelChange: EventEmitter<T> = new EventEmitter();
  @Output('fluentValueChanges') valueChanges: EventEmitter<T> = new EventEmitter();
  @Output('fluentStatusChanges') statusChanges: EventEmitter<FormControlStatus> = new EventEmitter();

  /** @internal */
  get directive(): ControlContainerDirective<T> {
    return this;
  }

  /**
   * 更新模型
   * @param utils
   */
  private onValueChanges() {
    this.formUtil.updateForm(
      this.form,
      this.schemas,
      this.internalModel = this.formUtil.updateModel(
        this.form,
        this.schemas,
        {} as T
      )
    );
    this.modelChange.emit(this.internalModel);
  }
}
