import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EnvironmentInjector, EventEmitter, Injector, Input, OnChanges, Output, QueryList, SimpleChanges, createComponent, inject } from '@angular/core';
import { FormControlStatus, FormGroup } from '@angular/forms';
import { AnyObject } from '@ngify/types';
import { takeUntil } from 'rxjs';
import { FluentTemplateDirective } from '../../directives';
import { FormGroupSchema } from '../../schemas';
import { DestroyedSubject } from '../../services';
import { runMicrotask } from '../../shared';
import { FLUENT_FORM_CONTENT, TEMPLATE_DIRECTIVES } from '../../tokens';
import { FormUtil, ModelUtil, SchemaUtil } from '../../utils';

@Component({
  selector: 'fluent-form',
  standalone: true,
  imports: [
    NgTemplateOutlet
  ],
  templateUrl: './form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DestroyedSubject,
    {
      provide: TEMPLATE_DIRECTIVES,
      useFactory: () => inject(FluentFormComponent).templateDirectives
    }
  ]
})
export class FluentFormComponent<T extends AnyObject> implements OnChanges {
  private readonly destroyed$ = inject(DestroyedSubject);
  private readonly formUtil = inject(FormUtil);
  private readonly modelUtil = inject(ModelUtil);
  private readonly schemaUtil = inject(SchemaUtil);
  /**
   * 内部的不可变模型，主要有以下用途：
   * - 用来跟公开的模型值进行引用比较，判断变更是内部发出的还是外部传入的，如果引用一致则为内部变更
   */
  private internalModel!: T;
  private _schema!: FormGroupSchema;

  templateRef = createComponent(inject(FLUENT_FORM_CONTENT), {
    environmentInjector: inject(EnvironmentInjector),
    elementInjector: inject(Injector)
  }).instance.templateRef;

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
    this.destroyed$.next();

    this.formChange.emit(
      this.form = this.formUtil.createFormGroup(this.schema, this.model)
    );

    this.onValueChanges();

    this.form.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(value => {
      this.onValueChanges();
      this.valueChanges.emit(value);
    });

    this.form.statusChanges.pipe(takeUntil(this.destroyed$)).subscribe(o =>
      this.statusChanges.emit(o)
    );
  }

  private updateForm() {
    return this.modelUtil.updateForm(this.form, this.model, this.schema.schemas);
  }

  private onValueChanges() {
    // NG0100，防止在更新模型之前在模板中读取模型
    runMicrotask(() => {
      this.formUtil.updateForm(
        this.form,
        this.model = this.internalModel = this.formUtil.updateModel(
          {} as T,
          this.form,
          this.schema.schemas
        ),
        this.schema.schemas
      );
      this.modelChange.emit(this.model);
    });
  }

}
