import { Component, EventEmitter, forwardRef, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import { NzCheckBoxOptionInterface } from 'ng-zorro-antd/checkbox';
import { NzFormLayoutType } from 'ng-zorro-antd/form';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { AnyControlOptions } from './fluent-form.interface';

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
export class FluentFormComponent<T extends Record<string, SafeAny>> implements OnInit, ControlValueAccessor {
  private onValueChange?: (value?: T) => void;
  private destroy$: Subject<void> = new Subject<void>();
  private _schema!: AnyControlOptions[];
  private _model?: T;

  get model(): T | undefined { return this._model; }
  set model(value: T | undefined) {
    this._model = value;
    value && this.model2form(value, this.form, this.schema);
    this.onValueChange?.(value);
  }

  @Input()
  get schema() { return this._schema; }
  set schema(value: AnyControlOptions[]) {
    this.clearFormControls(this.form);
    this.initializeForm(this.form, value);

    this._schema = value;
  }

  readonly form: FormGroup = new FormGroup({});
  readonly infinity: number = Infinity;

  /** Form layout */
  @Input() layout: NzFormLayoutType = 'vertical';
  /** Whether or not to display the colon after the label */
  @Input() noColon: boolean = false;
  @Input() canSave: boolean = true;
  @Input() addOnBefore: TemplateRef<{ form: FormGroup }> | null = null;
  @Input() addOnAfter: TemplateRef<{ form: FormGroup }> | null = null;
  @Input() spinning?: boolean;

  @Output() readonly submit: EventEmitter<T> = new EventEmitter<T>();
  @Output() readonly cancel: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      debounceTime(50),
      takeUntil(this.destroy$)
    ).subscribe((form: T) => {
      this.form2model(form, this.model ??= {} as T, this.schema);
      this.onValueChange?.(this.model);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  writeValue(value?: T): void {
    this.model = value;
  }

  registerOnChange(fn: (value?: T) => void): void {
    this.onValueChange = fn;
  }

  registerOnTouched(fn: SafeAny): void { }

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
      let value = Array.isArray(option.name) ? option.name.map(property => model?.[property]) : model?.[option.name]

      if (option.type === 'embed') {
        return this.model2form(value, form.controls[option.name] as FormGroup, option.schema);
      } else if (option.mapper) {
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
      }

      const controlName = option.name.toString();
      form.controls[controlName].setValue(value);
    });
  }

  /**
   * 从表单赋值到模型
   * @param form
   * @param model
   * @param schema
   */
  private form2model(form: Record<string, SafeAny>, model: Record<string, SafeAny>, schema: AnyControlOptions[]) {
    schema.forEach(option => {
      const controlName = option.name.toString();
      let value = form[controlName];

      if (option.type === 'embed') {
        return this.form2model(value, model[option.name] ??= {}, option.schema);
      } else if (option.mapper) {
        value = option.mapper.output(value);
      } else if (['date', 'time'].includes(option.type)) {
        value = (value as Date)?.getTime();
      } else if (option.type === 'range') {
        // 如果是双字段模式，将数组分别赋值到两个字段中去
        if (Array.isArray(option.name)) {
          return option.name.forEach((property: string, index: number) => {
            model[property] = value?.[index]?.getTime() ?? null;
          });
        }

        value = value?.map((o: Date) => o?.getTime());
      } else if (option.type === 'slider') {
        // 如果是双字段模式，将数组并分别赋值到两个字段中去
        if (Array.isArray(option.name)) {
          return option.name.forEach((property: string, index: number) => {
            model[property] = value?.[index] ?? null;
          });
        }
      } else if (option.type === 'checkbox') {
        value = (value as NzCheckBoxOptionInterface[])?.filter(o => o.checked).map(o => o.value);
      }

      model[option.name as string] = value;
    });
  }

  private initializeForm(form: FormGroup, schema: AnyControlOptions[]) {
    schema.forEach(option => {
      let control!: AbstractControl;

      if (option.type === 'embed') {
        this.initializeForm(control = new FormGroup({}), option.schema);
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

      const controlName = option.name.toString();
      form.setControl(controlName, control);
    });
  }

  private clearFormControls(form: FormGroup) {
    Object.keys(form.controls).forEach(name => {
      form.removeControl(name);
    });
  }

}
