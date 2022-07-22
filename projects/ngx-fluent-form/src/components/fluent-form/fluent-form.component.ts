import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzFormLayoutType } from 'ng-zorro-antd/form';
import { Subject, takeUntil } from 'rxjs';
import { COMPONENT_TEMPLATE_REF_PROVIDER } from '../../providers';
import { AnySchema } from '../../schemas';
import { Obj } from '../../type';
import { createFormGroup, formUtils, FormUtils, modelUtils, standardSchemas } from '../../utils';

@Component({
  selector: 'fluent-form',
  templateUrl: './fluent-form.component.html',
  styleUrls: ['./fluent-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [COMPONENT_TEMPLATE_REF_PROVIDER]
})
export class FluentFormComponent<T extends Obj> implements OnChanges, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  /**
   * 内部的不可变模型，用来跟公开的模型值进行引用比较，
   * 判断变更是内部发出的还是外部传入的，如果引用一致，则为内部变更，直接忽略
   */
  private _model!: T;
  private _schemas!: AnySchema[];

  /** @internal */
  form!: FormGroup;

  @Input()
  get schemas(): AnySchema[] {
    return this._schemas;
  }
  set schemas(value: AnySchema[]) {
    this._schemas = standardSchemas(value);
  }

  /** 模型 */
  @Input() model!: T;
  @Input() layout: NzFormLayoutType = 'vertical';
  @Input() colon: boolean = true;
  @Input() spinning?: boolean;
  @Input() spinTip: string = 'Loading...';
  @Input() spinSize: NzSizeLDSType = 'large';

  @Output() formChange: EventEmitter<FormGroup> = new EventEmitter();
  @Output() modelChange: EventEmitter<T> = new EventEmitter();

  ngOnChanges({ schemas: schemasChange, model: modelChange }: SimpleChanges): void {
    if (schemasChange) {
      if (!schemasChange.firstChange) {
        this.destroy$.next();
      }

      this.form = createFormGroup(this.schemas);
      this.formChange.emit(this.form);

      // 先把模型赋值到表单（使用模型初始化表单）
      modelUtils(this.model as Obj, this.schemas).assign(this.form);
      // 此时表单已就绪，把表单赋值到模型
      const utils = formUtils(this.form, this.schemas);
      this.updateModel(utils);

      this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.updateModel(utils);
      });
    }

    // 如果是首次变更（首次的初始化已在上面处理了）
    // 并且当前模型值与内部的模型值不一致
    if (modelChange && !modelChange.firstChange && modelChange.currentValue !== this._model) {
      modelUtils(this.model as Obj, this.schemas).assign(this.form);
    }
  }

  /**
   * 更新模型
   * @param utils
   */
  private updateModel(utils: FormUtils<FormGroup>) {
    utils.assign(this.model);
    this.modelChange.emit(this._model = utils.assign({} as T));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
