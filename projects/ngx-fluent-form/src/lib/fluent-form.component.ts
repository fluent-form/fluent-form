import { Component, EventEmitter, forwardRef, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { NzCheckBoxOptionInterface } from 'ng-zorro-antd/checkbox';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { AnyControlOptions } from './fluent-form.interface';
import { FluentFormControlNamePipe } from './fluent-form.pipe';

@Component({
  selector: 'fluent-form',
  templateUrl: './fluent-form.component.html',
  styleUrls: ['./fluent-form.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FluentFormComponent),
    multi: true
  }]
})
export class FluentFormComponent<T extends Record<string, NzSafeAny>> implements OnInit {
  private onValueChange = (value: T) => { };
  private destroy$: Subject<void> = new Subject<void>();
  private _model!: T;

  get model(): T { return this._model; }
  set model(value: T) {
    this._model = value;
    this.onValueChange(value);
  }

  private _schema!: AnyControlOptions[];

  @Input()
  get schema() { return this._schema; }
  set schema(value: AnyControlOptions[]) {
    this.clearFormControls(this.form);
    this.initFormControl(this.form, value);

    this._schema = value;
  }

  form: FormGroup = new FormGroup({});

  @Input() canSave: boolean = true;
  @Input() addOnBefore: TemplateRef<{ form: FormGroup }> | null = null;
  @Input() addOnAfter: TemplateRef<{ form: FormGroup }> | null = null;
  @Input() spinning?: boolean;

  @Output() submit: EventEmitter<T> = new EventEmitter<T>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  constructor(private controlNamePipe: FluentFormControlNamePipe) { }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      debounceTime(50),
      takeUntil(this.destroy$)
    ).subscribe((form: T) => {
      this.form2model(form, this.model, this.schema);
      this.model = this.model;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  writeValue(value: T): void {
    this.model = value;
    value && this.model2form(value, this.form, this.schema);
  }

  registerOnChange(fn: NzSafeAny): void {
    this.onValueChange = fn;
  }

  registerOnTouched(fn: NzSafeAny): void { }

  onSubmit() {
    this.submit.emit(this.model);
  }

  onCancel() {
    this.cancel.emit();
  }

  /**
   * 从模型赋值到表单
   * @param model
   * @param form
   * @param schema
   */
  private model2form(model: T, form: FormGroup, schema: AnyControlOptions[]) {
    schema.forEach(option => {
      // 如果是双字段模式，value 也将会是一个数组
      let value = Array.isArray(option.name) ? [model?.[option.name[0]], model?.[option.name[1]]] : model?.[option.name]

      if (option.mapper) {
        value = option.mapper.input(value);
      } else if (['date', 'time'].includes(option.type)) {
        value = value ? new Date(value) : null;
      } else if (option.type === 'range') {
        // 如果是双字段模式
        if (Array.isArray(option.name)) {
          value = value.map((o: string | number | Date) => o && new Date(o));
        }
      } else if (option.type === 'checkbox') {
        value = option.options.data.map(o => ({
          label: o[option.options.label ?? 'label'],
          value: o[option.options.value ?? 'value'],
          checked: (value as unknown[])?.includes(o[option.options.value ?? 'value'])
        })) as NzCheckBoxOptionInterface[];
      } else if (option.type === 'embed') {
        return this.model2form(value, form.controls[option.name] as FormGroup, option.schema);
      }

      const controlName = this.parseControlName(option);
      form.controls[controlName].setValue(value);
    });
  }

  /**
   * 从表单赋值到模型
   * @param form
   * @param model
   * @param schema
   */
  private form2model(form: Record<string, NzSafeAny>, model: Record<string, NzSafeAny>, schema: AnyControlOptions[]) {
    schema.forEach(option => {
      const controlName = this.parseControlName(option);
      let value = form[controlName];

      if (option.mapper) {
        value = option.mapper.output(value);
      } else if (['date', 'time'].includes(option.type)) {
        value = (value as Date)?.getTime();
      } else if (option.type === 'range') {
        const [startValue, endValue] = (value ?? []) as [Date, Date];
        // 如果是双字段模式，将数组拆分并分别赋值到两个字段中去
        if (Array.isArray(option.name)) {
          model[option.name[0]] = startValue?.getTime();
          model[option.name[1]] = endValue?.getTime();
          return;
        }

        value = [startValue?.getTime(), endValue?.getTime()];
      } else if (option.type === 'slider') {
        // 如果是双字段模式，将数组拆分并分别赋值到两个字段中去
        if (Array.isArray(option.name)) {
          const [startValue, endValue] = (value ?? []) as [number, number];
          model[option.name[0]] = startValue;
          model[option.name[1]] = endValue;
          return;
        }
      } else if (option.type === 'checkbox') {
        value = (value as NzCheckBoxOptionInterface[])?.filter(o => o.checked).map(o => o.value);
      } else if (option.type === 'embed') {
        return this.form2model(value, model[option.name] ??= {}, option.schema);
      }

      model[option.name as string] = value;
    });
  }

  private initFormControl(form: FormGroup, schema: AnyControlOptions[]) {
    schema.forEach(option => {
      let control!: AbstractControl;

      if (option.type === 'embed') {
        this.initFormControl(control = new FormGroup({}), option.schema);
      } else {
        control = new FormControl(
          { value: null, disabled: option.disabled },
          option.validator,
          option.asyncValidator,
        );

        if (option.type === 'email') {
          control.addValidators(Validators.email);
        }

        if (option.required) {
          control.addValidators(Validators.required);
        }
      }

      const controlName = this.parseControlName(option);
      form.setControl(controlName, control);
    });
  }

  private clearFormControls(form: FormGroup) {
    Object.keys(form.controls).forEach(name => {
      form.removeControl(name);
    });
  }

  private parseControlName(option: AnyControlOptions) {
    return this.controlNamePipe.transform(option.name);
  }
}
