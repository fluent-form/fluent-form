import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { NzFormLayoutType } from 'ng-zorro-antd/form';
import { NzRowDirective } from 'ng-zorro-antd/grid';
import { takeUntil } from 'rxjs';
import { group } from '../../builders';
import { AnySchema, FormGroupSchema } from '../../schemas';
import { Obj } from '../../types';
import { createFormGroup, formUtils, FormUtils, modelUtils, standardSchema } from '../../utils';

@Component({
  selector: 'fluent-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NzDestroyService]
})
export class FluentFormComponent<T extends Obj> implements OnChanges {
  /**
   * 内部的不可变模型，用来跟公开的模型值进行引用比较，
   * 判断变更是内部发出的还是外部传入的，如果引用一致，则为内部变更，直接忽略
   */
  private _model!: T;

  /** @internal */
  form!: FormGroup;
  /** @internal */
  schema!: FormGroupSchema;

  get schemas(): AnySchema[] {
    return this.schema?.schemas;
  }

  @Input()
  set schemas(value: AnySchema[] | FormGroupSchema) {
    // 这里统一包装为 FormGroupSchema
    this.schema = standardSchema(
      Array.isArray(value) ? group().schemas(...value) : standardSchema(value)
    );

    this.formChange.emit(this.form = createFormGroup(this.schema));
  }

  /** 模型 */
  @Input() model!: T;
  @Input() layout: NzFormLayoutType = 'vertical';
  @Input() colon: boolean = true;
  @Input() gutter: NzRowDirective['nzGutter'] = { xs: 8, sm: 16, md: 24, lg: 32, xl: 32, xxl: 32 };

  @Output() formChange: EventEmitter<FormGroup> = new EventEmitter();
  @Output() modelChange: EventEmitter<T> = new EventEmitter();

  constructor(private destroy$: NzDestroyService) { }

  ngOnChanges({ schemas: schemasChange, model: modelChange }: SimpleChanges): void {
    if (schemasChange) {
      schemasChange.firstChange || this.destroy$.next();

      const utils = formUtils(this.form, this.schemas);

      this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.onValueChanges(utils);
      });
      // 使用模型初始化表单
      modelUtils(this.model as Obj, this.schemas).assign(this.form);
    }

    // 如果是首次变更（首次的初始化已在上面处理了）
    // 并且当前模型值与内部的模型值不一致
    if (modelChange && !modelChange.firstChange && modelChange.currentValue !== this._model) {
      modelUtils(this.model as Obj, this.schemas).assign(this.form);
    }
  }

  /**
   * 表单值更新时
   * @param utils
   */
  private onValueChanges(utils: FormUtils<FormGroup>) {
    utils.assign(this.model);
    utils.change(this.model);
    this.modelChange.emit(this._model = utils.assign({} as T));
  }

}
