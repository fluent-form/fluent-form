import { Directive, EventEmitter, forwardRef, HostListener, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControlStatus, FormGroup } from '@angular/forms';
import { AnyArray, AnyObject } from '@ngify/types';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { takeUntil } from 'rxjs';
import { AnySchema, FormGroupSchema } from '../../schemas';
import { FormUtil, ModelUtil } from '../../utils';
import { FluentControlContainer, FluentControlContainerDirective } from './models/control-container';

@Directive({
  // eslint-disable-next-line
  selector: '[fluent-form]',
  exportAs: 'fluentForm',
  standalone: true,
  providers: [
    NzDestroyService,
    {
      provide: FluentControlContainer,
      useExisting: forwardRef(() => FluentFormDirective)
    }
  ]
})
export class FluentFormDirective<T extends AnyObject | AnyArray> extends FluentControlContainerDirective<T> implements OnChanges {
  private readonly destroy$ = inject(NzDestroyService);
  private readonly formUtil = inject(FormUtil);
  private readonly modelUtil = inject(ModelUtil);
  /**
   * 内部的不可变模型，主要有以下用途：
   * - 用来跟公开的模型值进行引用比较，判断变更是内部发出的还是外部传入的，如果引用一致则为内部变更
   */
  private internalModel!: T;
  private _schema!: FormGroupSchema;

  form!: FormGroup;

  get schemas(): AnySchema[] {
    return this.schema?.schemas;
  }

  @Input({ alias: 'fluentSchema', required: true })
  set schema(value: FormGroupSchema) {
    this._schema = this.schemaUtil.patch(value);
  }
  get schema(): FormGroupSchema {
    return this._schema;
  }

  @Input({ alias: 'fluentModel', required: true }) model!: T;

  @Output('fluentFormChange') formChange: EventEmitter<FormGroup> = new EventEmitter();
  @Output('fluentModelChange') modelChange: EventEmitter<T> = new EventEmitter();
  @Output('fluentValueChanges') valueChanges: EventEmitter<T> = new EventEmitter();
  @Output('fluentStatusChanges') statusChanges: EventEmitter<FormControlStatus> = new EventEmitter();
  /** The submit event will only be triggered when the host element is a form element */
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output('fluentSubmit') submit: EventEmitter<SubmitEvent> = new EventEmitter();

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

  @HostListener('submit', ['$event'])
  onSubmit(event: SubmitEvent) {
    this.submit.emit(event);
    return (event?.target as HTMLFormElement | null)?.method === 'dialog';
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

    this.outlets.forEach(outlet => this.updateOutlet(outlet));
  }

  private updateForm() {
    this.modelUtil.updateForm(this.form, this.model, this.schemas);
  }

  private onValueChanges() {
    this.formUtil.updateForm(
      this.form,
      this.model = this.internalModel = this.formUtil.updateModel(
        {} as T,
        this.form,
        this.schemas,
      ),
      this.schemas,
    );
    this.modelChange.emit(this.model);
  }

}
