import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzFormLayoutType } from 'ng-zorro-antd/form';
import { Subject, takeUntil } from 'rxjs';
import { AnySchema } from './models/schema.model';
import { assignFormToModel, assignModelToForm } from './utils/form.utils';
import { convertSchemasToGroup } from './utils/schema.utils';

@Component({
  selector: 'fluent-form',
  templateUrl: './fluent-form.component.html',
  styleUrls: ['./fluent-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FluentFormComponent<T extends Record<string, unknown>> implements OnInit {
  private destroy$: Subject<void> = new Subject<void>();
  private _schemas!: AnySchema[];
  private _form!: FormGroup;
  private _model!: T;

  readonly infinity: number = Infinity;

  get form(): FormGroup { return this._form; }
  set form(value: FormGroup) {
    this._form = value;
    this.formChange.emit(value);
  }

  @Input()
  get model(): T { return this._model; }
  set model(value: T) {
    this._model = value;
    this.schemas && assignModelToForm(value, this.form, this.schemas);
  }

  @Input()
  get schemas() { return this._schemas; }
  set schemas(value: AnySchema[]) {
    this._schemas = value;
    this.form = convertSchemasToGroup(value);
  }

  /** Form layout */
  @Input() layout: NzFormLayoutType = 'vertical';
  /** Whether or not to display the colon after the label */
  @Input() noColon: boolean = false;
  @Input() addOnBefore: TemplateRef<{ form: FormGroup }> | null = null;
  @Input() addOnAfter: TemplateRef<{ form: FormGroup }> | null = null;
  @Input() spinning?: boolean;
  @Input() spinTip: string = 'Loading...';
  @Input() spinSize: NzSizeLDSType = 'large';

  @Output() formChange: EventEmitter<FormGroup> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    assignModelToForm(this.model, this.form, this.schemas);

    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      assignFormToModel(this.form, this.model, this.schemas);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
