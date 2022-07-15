import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzFormLayoutType } from 'ng-zorro-antd/form';
import { Subject, takeUntil } from 'rxjs';
import { AnySchema } from '../../schemas';
import { createFormGroup, formUtils, modelUtils, standardSchemas } from '../../utils';

@Component({
  selector: 'fluent-form',
  templateUrl: './fluent-form.component.html',
  styleUrls: ['./fluent-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FluentFormComponent<T extends Record<string, unknown>> implements OnChanges, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  private _form!: FormGroup;
  private _schemas!: AnySchema[];
  /** @internal */
  readonly infinity: number = Infinity;

  get form(): FormGroup { return this._form; }
  set form(value: FormGroup) {
    this._form = value;
    this.formChange.emit(value);
  }

  @Input()
  get schemas(): AnySchema[] { return this._schemas; }
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

  constructor() { }

  ngOnChanges({ schemas: schemasChange, model: modelChange }: SimpleChanges): void {
    if (schemasChange) {
      if (!schemasChange.firstChange) {
        this.destroy$.next();
      }

      this.form = createFormGroup(this.schemas);
      const utils = formUtils(this.form, this.schemas);

      // 先把模型赋值到表单（使用模型初始化表单）
      modelUtils(this.model as Record<string, unknown>, this.schemas).assign(this.form);
      // 此时表单已就绪，把表单赋值到模型
      utils.assign(this.model);

      this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
        utils.assign(this.model);
      });
    }

    // 忽略模型的首次变更（首次的初始化已在上面处理了）
    if (modelChange && !modelChange.firstChange) {
      modelUtils(this.model as Record<string, unknown>, this.schemas).assign(this.form);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
