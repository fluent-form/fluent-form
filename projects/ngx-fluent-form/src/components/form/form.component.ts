import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { NzFormLayoutType } from 'ng-zorro-antd/form';
import { NzRowDirective } from 'ng-zorro-antd/grid';
import { takeUntil } from 'rxjs';
import { group } from '../../builders';
import { AnySchema, FormGroupSchema } from '../../schemas';
import { AnyObject } from '../../types';
import { createFormGroup, formUtils, FormUtils, modelUtils, standardSchema } from '../../utils';

@Component({
  selector: 'fluent-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NzDestroyService]
})
export class FluentFormComponent<T extends AnyObject>  {
  /**
   * 内部的不可变模型，主要有以下用途：
   * - 用来跟公开的模型值进行引用比较，判断变更是内部发出的还是外部传入的，如果引用一致则为内部变更
   */
  private immutableModel!: T;
  private _model!: T;

  protected form!: UntypedFormGroup;
  protected schema!: FormGroupSchema;

  get schemas(): AnySchema[] {
    return this.schema?.schemas as AnySchema[];
  }

  @Input()
  set schemas(value: AnySchema[] | FormGroupSchema) {
    this.schema && this.destroy$.next();

    // 这里统一包装为 FormGroupSchema
    this.schema = standardSchema(
      Array.isArray(value) ? group().schemas(...value) : value
    );
    this.formChange.emit(this.form = createFormGroup(this.schema));

    const utils = formUtils(this.form, this.schemas);
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.onValueChanges(utils);
    });

    // 如果模型已经好了，就使用初始化表单
    this.model && modelUtils(this.model as AnyObject, this.schemas).assign(this.form);
  }

  get model(): T {
    return this._model;
  }

  /** 模型 */
  @Input()
  set model(value: T) {
    this._model = value;

    // 如果是外部变更，就赋值到表单
    if (this.model !== this.immutableModel) {
      // 如果表单已经好了，就使用初始化表单
      this.form && modelUtils(this.model as AnyObject, this.schemas).assign(this.form);
    }
  }

  @Input() layout: NzFormLayoutType = 'vertical';
  @Input() colon = true;
  @Input() gutter: NzRowDirective['nzGutter'] = { xs: 8, sm: 16, md: 24, lg: 32, xl: 32, xxl: 32 };

  @Output() formChange: EventEmitter<UntypedFormGroup> = new EventEmitter();
  @Output() modelChange: EventEmitter<T> = new EventEmitter();

  constructor(private destroy$: NzDestroyService) { }

  /**
   * 表单值更新时
   * @param utils
   */
  private onValueChanges(utils: FormUtils<UntypedFormGroup>) {
    utils.change(this.immutableModel = utils.assign({} as T));
    this.modelChange.emit(this.immutableModel);
  }

}
