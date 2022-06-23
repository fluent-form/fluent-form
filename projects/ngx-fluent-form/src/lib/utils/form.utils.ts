import { FormArray, FormGroup } from '@angular/forms';
import { NzCheckBoxOptionInterface } from 'ng-zorro-antd/checkbox';
import { AnyBuilder, AnySchema } from '../models/schema.model';
import { standardSchemas } from './schema.utils';

/**
 * 从模型赋值到表单
 * @param model
 * @param form
 * @param schemas
 */
export function assignModelToForm<T extends Record<string, unknown>>(model: Record<string, unknown>, form: FormGroup, schemas: (AnySchema | AnyBuilder)[]): void;
export function assignModelToForm<T extends unknown[]>(model: T, form: FormArray, schemas: (AnySchema | AnyBuilder)[]): void;
export function assignModelToForm<T extends Record<string, unknown> | unknown[]>(model: T, form: FormGroup | FormArray, schemas: (AnySchema | AnyBuilder)[]): void {
  standardSchemas(schemas).forEach(schema => {
    if (schema.type === 'input-group') {
      return assignModelToForm(model as Record<string, unknown>, form as FormGroup, schema.schemas);
    }

    if (schema.type === 'group') {
      return assignModelToForm(
        (model[schema.name as keyof T] ??= {} as unknown as T[keyof T]) as unknown as Record<string, unknown>,
        form.get([schema.name!]) as FormGroup,
        schema.schemas
      );
    }

    if (schema.type === 'array') {
      return assignModelToForm(
        (model[schema.name as keyof T] ??= [] as unknown as T[keyof T]) as unknown as unknown[],
        form.get([schema.name!]) as FormArray,
        schema.schemas
      );
    }

    // 如果是双字段模式，则需要从模型中分别取得这两个字段的值作为一个数组
    let value: unknown = Array.isArray(schema.name) ?
      schema.name.map((property, index) => model[property as keyof T] ?? schema.value?.[index] ?? null) :
      model[schema.name as keyof T] ?? schema.value ?? null;

    if (schema.mapper) {
      value = schema.mapper.input(value);
    } else if (['date', 'time'].includes(schema.type)) {
      value = value ? new Date(value as string | number | Date) : null;
    } else if (schema.type === 'range') {
      value = (value as [string | number | Date, string | number | Date]).map(o => o ? new Date(o) : null);
    } else if (schema.type === 'checkbox') {
      value = schema.options.map(o => ({
        label: o[schema.config?.labelProperty ?? 'label'],
        value: o[schema.config?.valueProperty ?? 'value'],
        checked: (value as unknown[])?.includes(o[schema.config?.valueProperty ?? 'value'])
      })) as NzCheckBoxOptionInterface[];
    }

    form.get([schema.name!.toString()])!.setValue(value);
  });
}

/**
 * 从表单赋值到模型
 * @param form
 * @param model
 * @param schemas
 */
export function assignFormToModel<T extends Record<string, unknown>>(form: FormGroup, model: T, schemas: (AnySchema | AnyBuilder)[]): void;
export function assignFormToModel<T extends unknown[]>(form: FormArray, model: T, schemas: (AnySchema | AnyBuilder)[]): void;
export function assignFormToModel<T extends Record<string, unknown> | unknown[]>(form: FormGroup | FormArray, model: T, schemas: (AnySchema | AnyBuilder)[]): void {
  standardSchemas(schemas).forEach(schema => {
    if (schema.type === 'input-group') {
      return assignFormToModel(form as FormGroup, model as Record<string, unknown>, schema.schemas);
    }

    const control = form.get([schema.name!.toString()]);

    if (schema.type === 'group') {
      return assignFormToModel(
        control as FormGroup,
        (model[schema.name as keyof T] ??= ({} as T[keyof T])) as unknown as Record<string, unknown>,
        schema.schemas
      );
    }

    if (schema.type === 'array') {
      return assignFormToModel(
        control as FormArray,
        (model[schema.name as keyof T] ??= ([] as unknown as T[keyof T])) as unknown as unknown[],
        schema.schemas
      );
    }

    let value = control!.value as unknown | unknown[] | null;

    if (schema.mapper) {
      value = schema.mapper.output(value);
    } else if (['date', 'time'].includes(schema.type)) {
      value = (value as Date)?.getTime() ?? null;
    } else if (schema.type === 'range') {
      // 如果是双字段模式，将数组分别赋值到两个字段中去
      if (Array.isArray(schema.name)) {
        return schema.name.forEach((property: string | number, index: number) => {
          model[property as keyof T] = (
            (value as [Date?, Date?])?.[index]?.getTime() ?? null
          ) as unknown as T[keyof T];
        });
      }

      value = (value as [Date?, Date?])?.map(o => o?.getTime() ?? null);
    } else if (schema.type === 'slider') {
      // 如果是双字段模式，将数组并分别赋值到两个字段中去
      if (Array.isArray(schema.name)) {
        return schema.name.forEach((property: string | number, index: number) => {
          model[property as keyof T] = (
            (value as [number?, number?])?.[index] ?? null
          ) as unknown as T[keyof T];
        });
      }

      value = (value as [number?, number?])?.map(o => o ?? null);
    } else if (schema.type === 'checkbox') {
      value = (value as NzCheckBoxOptionInterface[])?.filter(o => o.checked).map(o => o.value);
    }

    model[schema.name as keyof T] = value as T[keyof T];
  });
}
