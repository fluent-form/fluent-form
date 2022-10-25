import { Directive, EventEmitter, forwardRef, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
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
  providers: [
    NzDestroyService,
    {
      provide: ControlContainer,
      useExisting: forwardRef(() => FluentFormDirective)
    }
  ]
})
export class FluentFormDirective<T extends AnyObject | AnyArray> extends ControlContainerDirective<T> implements OnChanges {
  /** @internal */
  schema!: FormGroupSchema;
  /** @internal */
  immutableModel!: T;
  /** @internal */
  form!: FormGroup;

  get schemas(): AnySchema[] {
    return this.schema?.schemas as AnySchema[];
  }

  @Input('fluentForm')
  set schemas(value: AnySchema[] | FormGroupSchema) {
    // 这里统一包装为 FormGroupSchema
    this.schema = standardSchema(
      Array.isArray(value) ? group().schemas(...value) : standardSchema(value)
    );

    this.formChange.emit(this.form = createFormGroup(this.schema));
  }

  /** 模型 */
  @Input('fluentModel') model!: T;

  @Output() modelChange: EventEmitter<T> = new EventEmitter();

  /** @internal */
  get directive(): ControlContainerDirective<T> {
    return this;
  }

  constructor(private destroy$: NzDestroyService) {
    super();
  }

  ngOnChanges({ schemas: schemasChange, model: modelChange }: SimpleChanges): void {
    if (schemasChange) {
      schemasChange.firstChange || this.destroy$.next();

      this.directives.forEach(directive => this.assignDirective(directive));

      const utils = formUtils(this.form, this.schemas);

      this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.onValueChanges(utils);
      });
      // 使用模型初始化表单
      modelUtils(this.model as AnyObject, this.schemas).assign(this.form);
    }

    // 如果不是首次变更（首次变更已经在上面处理了，这里要忽略掉）
    // 并且当前模型值与内部的模型值不一致（如果引用一致，则为组件内部引起的变更，我们只需要处理外部引起的变更）
    if (modelChange && !modelChange.firstChange && modelChange.currentValue !== this.immutableModel) {
      modelUtils(this.model as AnyObject, this.schemas).assign(this.form);
    }
  }

  /**
   * 更新模型
   * @param utils
   */
  private onValueChanges(utils: FormUtils<FormGroup | FormArray>) {
    utils.assign(this.model);
    utils.change(this.model);
    this.modelChange.emit(this.immutableModel = utils.assign({} as T));
  }
}
