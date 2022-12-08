import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
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
export class FluentFormComponent<T extends AnyObject> implements OnChanges {
  /**
   * 内部的不可变模型，主要有以下用途：
   * - 用来跟公开的模型值进行引用比较，判断变更是内部发出的还是外部传入的，如果引用一致则为内部变更
   * - 为了兼容 mutable model 的用法，需要确保每次传递给 call pipe 的 model 是 mutable 的
   */
  private immutableModel!: T;
  /** @internal */
  form!: UntypedFormGroup;
  /** @internal */
  schema!: FormGroupSchema;

  get schemas(): AnySchema[] {
    return this.schema?.schemas as AnySchema[];
  }

  @Input()
  set schemas(value: AnySchema[] | FormGroupSchema) {
    // 这里统一包装为 FormGroupSchema
    this.schema = standardSchema(
      Array.isArray(value) ? group().schemas(...value) : value
    );

    this.formChange.emit(this.form = createFormGroup(this.schema));
  }

  /** 模型 */
  @Input() model!: T;
  @Input() layout: NzFormLayoutType = 'vertical';
  @Input() colon = true;
  @Input() gutter: NzRowDirective['nzGutter'] = { xs: 8, sm: 16, md: 24, lg: 32, xl: 32, xxl: 32 };

  @Output() formChange: EventEmitter<UntypedFormGroup> = new EventEmitter();
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
      modelUtils(this.model as AnyObject, this.schemas).assign(this.form);
    }

    // 如果不是首次变更（首次变更已经在上面处理了，这里要忽略掉）
    // 并且当前模型值与内部的模型值不一致（如果引用一致，则为组件内部引起的变更，我们只需要处理外部引起的变更）
    if (modelChange && !modelChange.firstChange && modelChange.currentValue !== this.immutableModel) {
      modelUtils(this.model as AnyObject, this.schemas).assign(this.form);
    }
  }

  /**
   * 表单值更新时
   * @param utils
   */
  private onValueChanges(utils: FormUtils<UntypedFormGroup>) {
    utils.change(this.immutableModel = utils.assign({} as T));
    this.modelChange.emit(this.immutableModel);
  }

}
