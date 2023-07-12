import { NgClass, NgFor, NgIf, NgStyle, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, forwardRef, inject, Input, Output, QueryList } from '@angular/core';
import { FormControlStatus, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AnyObject } from '@ngify/types';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { NzFormLayoutType, NzFormModule } from 'ng-zorro-antd/form';
import { NzAlign, NzJustify, NzRowDirective } from 'ng-zorro-antd/grid';
import { takeUntil } from 'rxjs';
import { FluentBindingDirective, FluentTemplateDirective } from '../../directives';
import { DirectiveQueryContainer, FluentConfig } from '../../interfaces';
import { FluentColumnPipe, FluentControlPipe, FluentReactivePipe } from '../../pipes';
import { AnySchema, FormGroupSchema, StandardSchema } from '../../schemas';
import { SchemaKind } from '../../schemas/interfaces';
import { CONFIG, DIRECTIVE_QUERY_CONTAINER } from '../../tokens';
import { FormUtil, ModelUtil, SchemaUtil } from '../../utils';
import { FluentFormColContentOutletComponent } from '../form-col-content-outlet/form-col-content-outlet.component';

@Component({
  selector: 'fluent-form',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgClass,
    NgStyle,
    NgTemplateOutlet,
    ReactiveFormsModule,
    NzFormModule,
    FluentFormColContentOutletComponent,
    FluentBindingDirective,
    FluentReactivePipe,
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
    },
    {
      provide: DIRECTIVE_QUERY_CONTAINER,
      useExisting: forwardRef(() => FluentFormComponent)
    }
  ]
})
export class FluentFormComponent<T extends AnyObject> implements FluentConfig, DirectiveQueryContainer {
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

  protected schema!: StandardSchema<FormGroupSchema>;
  protected readonly SchemaKind = SchemaKind;

  form!: FormGroup;

  get schemas(): StandardSchema<AnySchema>[] {
    return this.schema?.schemas;
  }

  @Input()
  set schemas(value: StandardSchema<AnySchema>[] | StandardSchema<FormGroupSchema>) {
    // 这里统一包装为 FormGroupSchema
    this.schema = this.schemaUtil.patchSchema(
      Array.isArray(value) ? { kind: 'group', schemas: value } : value
    );

    if (this.model) {
      this.createForm();
    }
  }

  /** 模型 */
  get model(): T {
    return this._model;
  }

  /** 模型 */
  @Input()
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

  @Input() layout: NzFormLayoutType = 'vertical';
  @Input() colon = true;
  @Input() gutter: NzRowDirective['nzGutter'] | null = { xs: 8, sm: 16, md: 24, lg: 32, xl: 32, xxl: 32 };
  @Input() align: NzAlign | null = null;
  @Input() justify: NzJustify | null = null;

  @Output() formChange: EventEmitter<FormGroup> = new EventEmitter();
  @Output() modelChange: EventEmitter<T> = new EventEmitter();
  @Output() valueChanges: EventEmitter<T> = new EventEmitter();
  @Output() statusChanges: EventEmitter<FormControlStatus> = new EventEmitter();

  @ContentChildren(FluentTemplateDirective) templateDirectives!: QueryList<FluentTemplateDirective>;

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
    return this.modelUtil.updateForm(this.form, this.model, this.schemas);
  }

  private onValueChanges() {
    this.formUtil.updateForm(
      this.form,
      this.internalModel = this.formUtil.updateModel(
        {} as T,
        this.form,
        this.schemas
      ),
      this.schemas
    );
    this.modelChange.emit(this.internalModel);
  }

}
