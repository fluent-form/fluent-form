import { NgClass, NgFor, NgIf, NgStyle, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Input, OnChanges, Output, QueryList, SimpleChanges, inject } from '@angular/core';
import { FormControlStatus, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AnyObject } from '@ngify/types';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { NzFormModule } from 'ng-zorro-antd/form';
import { takeUntil } from 'rxjs';
import { FluentBindingDirective, FluentTemplateDirective } from '../../directives';
import { FluentColumnPipe, FluentControlPipe, FluentReactivePipe } from '../../pipes';
import { AnySchema, FormGroupSchema } from '../../schemas';
import { SchemaKind } from '../../schemas/interfaces';
import { queueMicrotask } from '../../shared';
import { TEMPLATE_DIRECTIVES } from '../../tokens';
import { FormUtil, ModelUtil, SchemaUtil } from '../../utils';
import { FluentFormColContentOutletComponent } from '../form-col-content-outlet/form-col-content-outlet.component';
import { FluentGridModule } from '../grid';

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
    FluentGridModule,
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
      provide: TEMPLATE_DIRECTIVES,
      useFactory: () => inject(FluentFormComponent).templateDirectives
    }
  ]
})
export class FluentFormComponent<T extends AnyObject> implements OnChanges {
  private readonly destroy$ = inject(NzDestroyService);
  private readonly formUtil = inject(FormUtil);
  private readonly modelUtil = inject(ModelUtil);
  private readonly schemaUtil = inject(SchemaUtil);
  /**
   * 内部的不可变模型，主要有以下用途：
   * - 用来跟公开的模型值进行引用比较，判断变更是内部发出的还是外部传入的，如果引用一致则为内部变更
   */
  private internalModel!: T;
  private _schema!: FormGroupSchema;

  protected readonly SchemaKind = SchemaKind;
  protected get schemas(): AnySchema[] {
    return this.schema?.schemas;
  }

  form!: FormGroup;

  @Input({ required: true })
  set schema(value: FormGroupSchema) {
    this._schema = this.schemaUtil.patch(value);
  }
  get schema(): FormGroupSchema {
    return this._schema;
  }

  @Input({ required: true }) model!: T;

  @Output() formChange: EventEmitter<FormGroup> = new EventEmitter();
  @Output() modelChange: EventEmitter<T> = new EventEmitter();
  @Output() valueChanges: EventEmitter<T> = new EventEmitter();
  @Output() statusChanges: EventEmitter<FormControlStatus> = new EventEmitter();
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() submit: EventEmitter<SubmitEvent> = new EventEmitter();

  @ContentChildren(FluentTemplateDirective) templateDirectives!: QueryList<FluentTemplateDirective>;

  ngOnChanges(changes: SimpleChanges): void {
    const schemaChange = changes['schema'];
    const modelChange = changes['model'];

    if (schemaChange) {
      this.createForm();
    } else if (modelChange) {
      // 如果是外部变更，就赋值到表单
      if (this.model !== this.internalModel) {
        this.updateForm();
      }
    }
  }

  private createForm() {
    this.destroy$.next();

    this.formChange.emit(
      this.form = this.formUtil.createFormGroup(this.schema, this.model)
    );

    this.onValueChanges();

    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.onValueChanges();
      this.valueChanges.emit(value);
    });

    this.form.statusChanges.pipe(takeUntil(this.destroy$)).subscribe(o =>
      this.statusChanges.emit(o)
    );
  }

  private updateForm() {
    return this.modelUtil.updateForm(this.form, this.model, this.schemas);
  }

  private onValueChanges() {
    // NG0100，防止在更新模型之前在模板中读取模型
    queueMicrotask(() => {
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
    });
  }

}
