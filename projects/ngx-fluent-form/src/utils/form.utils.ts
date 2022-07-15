import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { NzCheckBoxOptionInterface } from 'ng-zorro-antd/checkbox';
import { isComponentContainerSchema, isComponentSchema, isDoubleKeySchema } from '.';
import { AnyControlSchema, AnySchema, ComposableComponentSchema, ControlSchema } from '../schemas/index.schema';

/**
 * 将图示转换为控件
 * @param schema
 */
export function createFormControl(schema: ControlSchema): FormControl {
  return new FormControl(
    { value: schema.value ?? null, disabled: schema.disabled },
    schema.validator,
    schema.asyncValidator
  );
}

/**
 * 将图示组转换为表单组
 * @param schemas 标准化后的图示
 */
export function createFormGroup(schemas: AnySchema[]): FormGroup {
  return new FormGroup(
    // 过滤掉组件图示和组件容器图示
    schemas.filter(o => !isComponentSchema(o) && !isComponentContainerSchema(o)).reduce((controls, schema) => {
      switch (schema.type) {
        case 'group':
          controls[schema.name!.toString()] = createFormGroup(schema.schemas as AnySchema[]);
          break;

        case 'array':
          controls[schema.name!.toString()] = createFormArray(schema.schemas as AnyControlSchema[]);
          break;

        case 'input-group':
          (schema.schemas as ComposableComponentSchema[]).filter(o => !isComponentSchema(o)).forEach(subschema => {
            controls[subschema.name!.toString()] = createFormControl(subschema as ControlSchema);
          });
          break;

        default:
          controls[schema.name!.toString()] = createFormControl(schema as ControlSchema);
      }

      return controls;
    }, {} as Record<string, AbstractControl>)
  );
}

/**
 * 将图示组转换为表单数组
 * @param schemas 标准化后的图示
 */
export function createFormArray(schemas: AnyControlSchema[]): FormArray {
  return new FormArray(
    schemas.map(schema => {
      switch (schema.type) {
        case 'group':
          return createFormGroup(schema.schemas as AnySchema[]);

        case 'array':
          return createFormArray(schema.schemas as AnyControlSchema[]);

        default:
          return createFormControl(schema);
      }
    })
  );
}

type Obj = Record<string, unknown>;
type Arr = unknown[];

/**
 * 清空对象但保持引用
 * @param obj
 */
function emptyObject<T extends object>(obj: T): T {
  Object.keys(obj).forEach(property => delete obj[property as keyof T]);
  return obj;
}

export function formUtils<F extends FormGroup | FormArray>(form: F, schemas: AnySchema[]) {
  return new FormUtils(form, schemas);
}

export function modelUtils<M extends Arr | Obj>(model: M, schemas: AnySchema[]) {
  return new ModelUtils(model, schemas);
}

export function valueUtils<S extends Obj | Arr | AbstractControl>(source: S, schema: ControlSchema) {
  return new ValueUtils(source, schema);
}

class FormUtils<F extends FormGroup | FormArray> {
  constructor(
    private readonly form: F,
    private readonly schemas: AnySchema[],
  ) { }

  /**
   * 将表单值分配到模型
   * @param model
   * @param clear 是否清空模型，函数内部递归调用的时候将置为false，保证只会清空一次
   * @returns model
   */
  assign<T extends (F extends FormGroup ? Obj : Arr)>(model: T, clear: boolean = true): T {
    clear && emptyObject(model);

    this.schemas.forEach(schema => {
      // 这些图示不包含控件图示，直接跳过
      if (isComponentSchema(schema) || isComponentContainerSchema(schema)) { return; }

      if (schema.type === 'input-group') {
        formUtils(this.form, schema.schemas as AnySchema[]).assign(model, false);
        return;
      }

      const control = this.form.get([schema.name!.toString()])!;

      if (schema.type === 'group') {
        formUtils(control as FormGroup, schema.schemas as AnySchema[]).assign(
          (model[schema.name as keyof T] = ({} as T[keyof T])) as unknown as Obj,
          false
        );
        return;
      }

      if (schema.type === 'array') {
        formUtils(control as FormArray, schema.schemas as AnySchema[]).assign(
          (model[schema.name as keyof T] = ([] as unknown as T[keyof T])) as unknown as Arr,
          false
        );
        return;
      }

      const value = valueUtils(control, schema).getValue();

      // 双字段情况
      if (isDoubleKeySchema(schema)) {
        schema.name!.map((prop, idx) => {
          model[prop as keyof T] = ((value as [unknown, unknown])?.[idx] ?? null) as T[keyof T];
        });
      } else {
        model[schema.name as keyof T] = value as T[keyof T];
      }
    });

    return model;
  }

}

class ValueUtils<S extends Obj | Arr | AbstractControl> {
  constructor(
    private readonly source: S,
    private readonly schema: ControlSchema
  ) { }

  getValue(): unknown {
    return this.source instanceof AbstractControl ? this.getControlValue() : this.getModelValue();
  }

  private getModelValue(): unknown {
    let value: unknown;
    // 如果是双字段模式，则需要从模型中分别取得这两个字段的值组为一个元组
    if (isDoubleKeySchema(this.schema)) {
      value = this.schema.name!.map((prop, index) => (
        this.source[prop as keyof S] ?? this.schema.value?.[index] ?? null
      ));
      // 如果数组元素都是 null，那就直接赋值 null
      if ((value as []).every(o => o === null)) {
        value = null;
      }
    } else {
      value = this.source[this.schema.name as keyof S] ?? this.schema.value ?? null;
    }

    if (this.schema.mapper) {
      return this.schema.mapper.input(value);
    }

    if (['date', 'time'].includes(this.schema.type)) {
      return value ? new Date(value as string | number | Date) : null;
    }

    if (this.schema.type === 'range') {
      return (value as [string | number | Date, string | number | Date])?.map(o => o ? new Date(o) : null) ?? null;
    }

    if (this.schema.type === 'checkbox-group') {
      const labelProperty = this.schema.config?.labelProperty ?? 'label';
      const valueProperty = this.schema.config?.valueProperty ?? 'value';

      return this.schema.options.map(o => ({
        label: o[labelProperty],
        value: o[valueProperty],
        checked: (value as unknown[])?.includes(o[valueProperty])
      })) as NzCheckBoxOptionInterface[];
    }

    return value;
  }

  private getControlValue(): unknown {
    const value = (this.source as AbstractControl).value as unknown;

    if (this.schema.mapper) {
      return this.schema.mapper.output(value);
    }

    if (['date', 'time'].includes(this.schema.type)) {
      return (value as Date | null)?.getTime() ?? null;
    }

    if (this.schema.type === 'range') {
      return (value as [Date | null, Date | null])?.map(o => o?.getTime() ?? null) ?? null;
    }

    if (this.schema.type === 'slider') {
      return value as [number, number] ?? null;
    }

    if (this.schema.type === 'checkbox-group') {
      return (value as NzCheckBoxOptionInterface[])?.filter(o => o.checked).map(o => o.value);
    }

    return value;
  }
}

class ModelUtils<M extends Arr | Obj> {
  constructor(
    private readonly model: M,
    private readonly schemas: AnySchema[],
  ) { }

  /**
   * 将模型的值赋值到表单
   * @param form
   * @param emitEvent 是否发射事件，函数内部递归调用的时候将置为false，保证只会触发一次事件
   * @returns form
   */
  assign<F extends (M extends Obj ? FormGroup : FormArray)>(form: F, emitEvent: boolean = true): F {
    this.schemas.forEach(schema => {
      // 这些图示不包含控件图示，直接跳过
      if (isComponentSchema(schema) || isComponentContainerSchema(schema)) { return; }

      if (schema.type === 'input-group') {
        modelUtils(this.model as Obj, schema.schemas as AnySchema[]).assign(form as FormGroup, false);
        return;
      }

      if (schema.type === 'group') {
        modelUtils(
          (this.model[schema.name as keyof M] ??= {} as M[keyof M]) as unknown as Obj,
          schema.schemas as AnySchema[]
        ).assign(form.get([schema.name!]) as FormGroup, false);
        return;
      }

      if (schema.type === 'array') {
        modelUtils(
          (this.model[schema.name as keyof M] ??= [] as unknown as M[keyof M]) as unknown as Arr,
          schema.schemas as AnySchema[]
        ).assign(form.get([schema.name!]) as FormArray, false);
        return;
      }

      const value = valueUtils(this.model, schema).getValue();

      form.get([schema.name!.toString()])!.setValue(value, { emitEvent: false });
    });

    emitEvent && form.updateValueAndValidity();

    return form;
  }
}
