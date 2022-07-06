import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzFormLayoutType } from 'ng-zorro-antd/form';
import { Subject, takeUntil } from 'rxjs';
import { AnySchema } from './schemas';
import { assignFormToModel, assignModelToForm } from './utils/form.utils';
import { convertSchemasToGroup } from './utils/schema.utils';

@Component({
  selector: 'fluent-form',
  templateUrl: './fluent-form.component.html',
  styleUrls: ['./fluent-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FluentFormComponent<T extends Record<string, unknown>> implements OnInit, OnChanges {
  private destroy$: Subject<void> = new Subject<void>();
  private _form!: FormGroup;

  readonly infinity: number = Infinity;

  get form(): FormGroup { return this._form; }
  set form(value: FormGroup) {
    this._form = value;
    this.formChange.emit(value);
  }

  @Input() schemas!: AnySchema[];
  @Input() model!: T;
  @Input() layout: NzFormLayoutType = 'vertical';
  @Input() colon: boolean = true;
  @Input() spinning?: boolean;
  @Input() spinTip: string = 'Loading...';
  @Input() spinSize: NzSizeLDSType = 'large';

  @Output() formChange: EventEmitter<FormGroup> = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  ngOnChanges({ schemas: schemasChange, model: modelChange }: SimpleChanges): void {
    if (schemasChange) {
      if (!schemasChange.firstChange) {
        this.destroy$.next();
      }

      this.form = convertSchemasToGroup(this.schemas);

      // 先把模型赋值到表单（使用模型初始化表单）
      assignModelToForm(this.model, this.form, this.schemas);
      // 此时表单已就绪，把表单赋值到模型
      assignFormToModel(this.form, this.model, this.schemas);

      this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
        assignFormToModel(this.form, this.model, this.schemas);
      });
    }

    // 忽略模型的首次变更（首次的初始化已在上面处理了）
    if (modelChange && !modelChange.firstChange) {
      assignModelToForm(this.model, this.form, this.schemas);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
