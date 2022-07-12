import { FormArray, FormGroup } from '@angular/forms';
import { NzCheckBoxOptionInterface } from 'ng-zorro-antd/checkbox';
import { AnySchema } from '../schemas/index.schema';
import { isComponentContainerSchema, isComponentSchema, isDoubleKeySchemaName } from './schema.utils';

type Obj = Record<string, unknown>;
type Arr = unknown[];

/**
 * 从模型赋值到表单
 * @param model
 * @param form
 * @param schemas 标准化后的图示
 * @param emitEvent 是否发射事件，函数内部递归调用的时候将置为false，保证只会触发一次事件
 */
export function assignModelToForm<T extends Obj>(model: T, form: FormGroup, schemas: AnySchema[], emitEvent?: boolean): void;
export function assignModelToForm<T extends Arr>(model: T, form: FormArray, schemas: AnySchema[], emitEvent?: boolean): void;
export function assignModelToForm<T extends Obj | Arr>(model: T, form: FormGroup | FormArray, schemas: AnySchema[], emitEvent: boolean = true): void {
  schemas.forEach(schema => {
    // 这些图示不包含控件图示，直接跳过
    if (isComponentSchema(schema) || isComponentContainerSchema(schema)) { return; }

    if (schema.type === 'input-group') {
      return assignModelToForm(
        model as Obj,
        form as FormGroup,
        schema.schemas as AnySchema[],
        false
      );
    }

    if (schema.type === 'group') {
      return assignModelToForm(
        (model[schema.name as keyof T] ??= {} as T[keyof T]) as unknown as Obj,
        form.get([schema.name!]) as FormGroup,
        schema.schemas as AnySchema[],
        false
      );
    }

    if (schema.type === 'array') {
      return assignModelToForm(
        (model[schema.name as keyof T] ??= [] as unknown as T[keyof T]) as unknown as Arr,
        form.get([schema.name!]) as FormArray,
        schema.schemas as AnySchema[],
        false
      );
    }

    let value: unknown;
    // 如果是双字段模式，则需要从模型中分别取得这两个字段的值组为一个元组
    if (isDoubleKeySchemaName(schema.name!)) {
      value = schema.name.map((property, index) => (
        (model as Obj)[property] ?? schema.value?.[index] ?? null
      ));
      // 如果数组元素都是 null，那就直接赋值 null
      if ((value as []).every(o => o === null)) {
        value = null;
      }
    } else {
      value = model[schema.name as keyof T] ?? schema.value ?? null;
    }

    if (schema.mapper) {
      value = schema.mapper.input(value);
    } else if (['date', 'time'].includes(schema.type)) {
      value = value ? new Date(value as string | number | Date) : null;
    } else if (schema.type === 'range') {
      value = (value as [string | number | Date, string | number | Date])?.map(o => o ? new Date(o) : null) ?? null;
    } else if (schema.type === 'checkbox-group') {
      const labelProperty = schema.config?.labelProperty ?? 'label';
      const valueProperty = schema.config?.valueProperty ?? 'value';

      value = schema.options.map(o => ({
        label: o[labelProperty],
        value: o[valueProperty],
        checked: (value as unknown[])?.includes(o[valueProperty])
      })) as NzCheckBoxOptionInterface[];
    }

    form.get([schema.name!.toString()])!.setValue(value, { emitEvent: false });
  });

  emitEvent && form.updateValueAndValidity();
}

/**
 * 清空对象但保持引用
 * @param obj
 */
function empty<T extends object>(obj: T): T {
  if (Array.isArray(obj)) {
    obj.length = 0;
  } else {
    Object.keys(obj).forEach(property => delete obj[property as keyof T]);
  }

  return obj;
}

/**
 * 通过图示分配表单值到模型
 * @param form
 * @param model
 * @param schemas 标准化后的图示
 * @param clear 是否清空模型，函数内部递归调用的时候将置为false，保证只会清空一次
 */
export function assignFormToModel<T extends Obj>(form: FormGroup, model: T, schemas: AnySchema[], clear?: boolean): T;
export function assignFormToModel<T extends Arr>(form: FormArray, model: T, schemas: AnySchema[], clear?: boolean): T;
export function assignFormToModel<T extends Obj | Arr>(form: FormGroup | FormArray, model: T, schemas: AnySchema[], clear: boolean = true) {
  clear && empty(model);

  schemas.forEach(schema => {
    // 这些图示不包含控件图示，直接跳过
    if (isComponentSchema(schema) || isComponentContainerSchema(schema)) { return; }

    if (schema.type === 'input-group') {
      return assignFormToModel(
        form as FormGroup,
        model as Obj,
        schema.schemas as AnySchema[],
        false
      );
    }

    const control = form.get([schema.name!.toString()])!;

    if (schema.type === 'group') {
      return assignFormToModel(
        control as FormGroup,
        (model[schema.name as keyof T] ??= ({} as T[keyof T])) as unknown as Obj,
        schema.schemas as AnySchema[],
        false
      );
    }

    if (schema.type === 'array') {
      return assignFormToModel(
        control as FormArray,
        (model[schema.name as keyof T] ??= ([] as unknown as T[keyof T])) as unknown as Arr,
        schema.schemas as AnySchema[],
        false
      );
    }

    let value: unknown = control.value;

    if (schema.mapper) {
      value = schema.mapper.output(value);
    } else if (['date', 'time'].includes(schema.type)) {
      value = (value as Date | null)?.getTime() ?? null;
    } else if (schema.type === 'range') {
      // 如果是双字段模式，值为一个元组，将元组元素分别赋值到两个字段中去
      if (isDoubleKeySchemaName(schema.name!)) {
        return schema.name.forEach((property, index) => {
          model[property as keyof T] = (
            (value as [Date | null, Date | null])?.[index]?.getTime() ?? null
          ) as unknown as T[keyof T];
        });
      }

      value = (value as [Date | null, Date | null])?.map(o => o?.getTime() ?? null) ?? null;
    } else if (schema.type === 'slider') {
      // 如果是双字段模式，将数组并分别赋值到两个字段中去
      if (isDoubleKeySchemaName(schema.name!)) {
        return schema.name.forEach((property, index) => {
          model[property as keyof T] = (
            (value as [number | null, number | null])?.[index] ?? null
          ) as unknown as T[keyof T];
        });
      }
    } else if (schema.type === 'checkbox-group') {
      value = (value as NzCheckBoxOptionInterface[])?.filter(o => o.checked).map(o => o.value);
    }

    model[schema.name as keyof T] = value as T[keyof T];
  });

  return model;
}
