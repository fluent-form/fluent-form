import { NgClass, NgFor, NgStyle, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, forwardRef, inject } from '@angular/core';
import { FormControlStatus, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AnyObject } from '@ngify/types';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { NzFormLayoutType, NzFormModule } from 'ng-zorro-antd/form';
import { NzAlign, NzJustify, NzRowDirective } from 'ng-zorro-antd/grid';
import { skip, takeUntil } from 'rxjs';
import { FluentConfig } from '../../config';
import { FluentBindingDirective } from '../../directives';
import { FluentCallPipe, FluentColumnPipe, FluentControlPipe } from '../../pipes';
import { AnySchema, FormGroupSchema } from '../../schemas';
import { StandardSchema } from '../../schemas/types';
import { CONFIG } from '../../tokens';
import { FormUtils, createFormGroup, formUtils, modelUtils, standardSchema } from '../../utils';
import { FluentFormColContentOutletComponent } from '../form-col-content-outlet/form-col-content-outlet.component';

@Component({
  selector: 'fluent-form',
  standalone: true,
  imports: [
    NgFor,
    NgClass,
    NgStyle,
    NgTemplateOutlet,
    ReactiveFormsModule,
    NzFormModule,
    FluentFormColContentOutletComponent,
    FluentBindingDirective,
    FluentCallPipe,
    FluentControlPipe,
    FluentColumnPipe
  ],
  templateUrl: './form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    NzDestroyService,
    {
      provide: CONFIG,
      useExisting: forwardRef(() => FluentFormComponent)
    }
  ]
})
export class FluentFormComponent<T extends AnyObject> implements OnChanges, FluentConfig {
  private readonly destroy$ = inject(NzDestroyService);
  /**
   * 内部的不可变模型，主要有以下用途：
   * - 用来跟公开的模型值进行引用比较，判断变更是内部发出的还是外部传入的，如果引用一致则为内部变更
   */
  private internalModel!: T;
  protected schema!: StandardSchema<FormGroupSchema>;

  form!: FormGroup;

  get schemas(): StandardSchema<AnySchema>[] {
    return this.schema?.schemas;
  }

  @Input()
  set schemas(value: AnySchema[] | FormGroupSchema) {
    this.schema && this.destroy$.next();

    // 这里统一包装为 FormGroupSchema
    this.schema = standardSchema(
      Array.isArray(value) ? { kind: 'group', schemas: value } : value
    );

    this.formChange.emit(this.form = createFormGroup(this.schema));

    const utils = formUtils(this.form, this.schemas);
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.onValueChanges(utils);
    });

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

  /** 模型 */
  @Input() model!: T;
  @Input() layout: NzFormLayoutType = 'vertical';
  @Input() colon = true;
  @Input() gutter: NzRowDirective['nzGutter'] | null = { xs: 8, sm: 16, md: 24, lg: 32, xl: 32, xxl: 32 };
  @Input() align: NzAlign | null = null;
  @Input() justify: NzJustify | null = null;

  @Output() formChange: EventEmitter<FormGroup> = new EventEmitter();
  @Output() modelChange: EventEmitter<T> = new EventEmitter();
  @Output() valueChanges: EventEmitter<T> = new EventEmitter();
  @Output() statusChanges: EventEmitter<FormControlStatus> = new EventEmitter();

  ngOnChanges({ schemas: schemasChange, model: modelChange }: SimpleChanges) {
    if (schemasChange || modelChange) {
      // 如果是外部变更，就赋值到表单
      if (this.model !== this.internalModel) {
        modelUtils(this.model as AnyObject, this.schemas).assign(this.form);
      }
    }
  }

  /**
   * 表单值更新时
   * @param utils
   */
  private onValueChanges(utils: FormUtils<FormGroup>) {
    utils.change(this.internalModel = utils.assign({} as T));
    this.modelChange.emit(this.internalModel);
  }

}
