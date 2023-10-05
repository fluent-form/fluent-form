import { NgClass, NgFor, NgIf, NgStyle, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, forwardRef, inject, Input, Output, QueryList } from '@angular/core';
import { FormControlStatus, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AnyObject } from '@ngify/types';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { NzFormLayoutType, NzFormModule } from 'ng-zorro-antd/form';
import { NzAlign, NzJustify, NzRowDirective } from 'ng-zorro-antd/grid';
import { takeUntil } from 'rxjs';
import { CONFIG, FluentConfig } from '../../config';
import { FluentBindingDirective, FluentTemplateDirective } from '../../directives';
import { TemplateDirectivesContainer } from '../../interfaces';
import { FluentColumnPipe, FluentControlPipe, FluentReactivePipe } from '../../pipes';
import { AnySchema, FormGroupSchema } from '../../schemas';
import { SchemaKind } from '../../schemas/interfaces';
import { TEMPLATE_DIRECTIVES_CONTAINER } from '../../tokens';
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
      provide: TEMPLATE_DIRECTIVES_CONTAINER,
      useExisting: forwardRef(() => FluentFormComponent)
    }
  ]
})
export class FluentFormComponent<T extends AnyObject> implements FluentConfig, TemplateDirectivesContainer {
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
  private _schema!: FormGroupSchema;

  protected readonly SchemaKind = SchemaKind;
  protected get schemas(): AnySchema[] {
    return this.schema?.schemas;
  }

  form!: FormGroup;

  @Input()
  set schema(value: FormGroupSchema) {
    this._schema = this.schemaUtil.patchSchema(value);

    if (this.model) {
      this.createForm();
    }
  }
  get schema(): FormGroupSchema {
    return this._schema;
  }

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
  get model(): T {
    return this._model;
  }

  @Input() layout: NzFormLayoutType;
  @Input() colon: boolean;
  @Input() gutter: NzRowDirective['nzGutter'] | null;
  @Input() align: NzAlign | null = null;
  @Input() justify: NzJustify | null = null;

  @Output() formChange: EventEmitter<FormGroup> = new EventEmitter();
  @Output() modelChange: EventEmitter<T> = new EventEmitter();
  @Output() valueChanges: EventEmitter<T> = new EventEmitter();
  @Output() statusChanges: EventEmitter<FormControlStatus> = new EventEmitter();

  @ContentChildren(FluentTemplateDirective) templateDirectives!: QueryList<FluentTemplateDirective>;

  constructor() {
    const config = inject(CONFIG, { skipSelf: true });
    this.layout = config.layout;
    this.colon = config.colon;
    this.gutter = config.gutter;
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
    return this.modelUtil.updateForm(this.form, this.model, this.schemas);
  }

  private onValueChanges() {
    this.formUtil.updateForm(
      this.form,
      this.model = this.internalModel = this.formUtil.updateModel(
        {} as T,
        this.form,
        this.schemas
      ),
      this.schemas
    );
    this.modelChange.emit(this.model);
  }

}
