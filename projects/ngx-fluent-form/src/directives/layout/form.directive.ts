import { Directive, EventEmitter, forwardRef, inject, Input, Output } from '@angular/core';
import { FormControlStatus, FormGroup } from '@angular/forms';
import { AnyArray, AnyObject } from '@ngify/types';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { takeUntil } from 'rxjs';
import { AnySchema, FormGroupSchema, StandardSchema } from '../../schemas';
import { FormUtil, ModelUtil, SchemaUtil } from '../../utils';
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
  private readonly schemaUtil = inject(SchemaUtil);
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
  set schemas(value: StandardSchema<AnySchema>[] | StandardSchema<FormGroupSchema>) {
    // 这里统一包装为 FormGroupSchema
    this.schema = this.schemaUtil.patchSchema(
      Array.isArray(value) ? { kind: 'group', schemas: value } : value
    );

    if (this.model) {
      this.createForm();
    }
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
      if (this.form) {
        this.updateForm();
      } else if (this.schema) {
        this.createForm();
      }
    }
  }

  @Output('fluentModelChange') modelChange: EventEmitter<T> = new EventEmitter();
  @Output('fluentValueChanges') valueChanges: EventEmitter<T> = new EventEmitter();
  @Output('fluentStatusChanges') statusChanges: EventEmitter<FormControlStatus> = new EventEmitter();

  /** @internal */
  get directive(): ControlContainerDirective<T> {
    return this;
  }

  private createForm() {
    this.destroy$.next();

    this.formChange.emit(
      this.form = this.formUtil.createFormGroup(this.schema, this.model)
    );

    this.onValueChanges();

    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.onValueChanges();
    });

    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(o =>
      this.valueChanges.emit(o)
    );

    this.form.statusChanges.pipe(takeUntil(this.destroy$)).subscribe(o =>
      this.statusChanges.emit(o)
    );
  }

  private updateForm() {
    this.modelUtil.updateForm(this.form, this.model, this.schemas);
  }

  private onValueChanges() {
    this.formUtil.updateForm(
      this.form,
      this.internalModel = this.formUtil.updateModel(
        {} as T,
        this.form,
        this.schemas,
      ),
      this.schemas,
    );
    this.modelChange.emit(this.internalModel);
  }
}
