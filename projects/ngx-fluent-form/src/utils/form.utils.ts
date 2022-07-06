import { FormArray, FormGroup } from '@angular/forms';
import { NzCheckBoxOptionInterface } from 'ng-zorro-antd/checkbox';
import { AnyBuilder, AnySchema } from '../schemas/index.schema';
import { isDoubleKeySchemaName, standardSchemas } from './schema.utils';

type Obj = Record<string, unknown>;
type Arr = unknown[];

/**
 * 从模型赋值到表单
 * @param model
 * @param form
 * @param schemas
 * @param emitEvent 是否发射事件，函数内部递归调用的时候将置为false，保证只会触发一次事件
 */
export function assignModelToForm<T extends Obj>(model: T, form: FormGroup, schemas: (AnySchema | AnyBuilder)[], emitEvent?: boolean): void;
export function assignModelToForm<T extends Arr>(model: T, form: FormArray, schemas: (AnySchema | AnyBuilder)[], emitEvent?: boolean): void;
export function assignModelToForm<T extends Obj | Arr>(model: T, form: FormGroup | FormArray, schemas: (AnySchema | AnyBuilder)[], emitEvent: boolean = true): void {
  standardSchemas(schemas).forEach(schema => {
    if (schema.type === 'input-group') {
      return assignModelToForm(
        model as Obj,
        form as FormGroup,
        schema.schemas,
        false
      );
    }

    if (schema.type === 'group') {
      return assignModelToForm(
        (model[schema.name as keyof T] ??= {} as T[keyof T]) as unknown as Obj,
        form.get([schema.name!]) as FormGroup,
        schema.schemas,
        false
      );
    }

    if (schema.type === 'array') {
      return assignModelToForm(
        (model[schema.name as keyof T] ??= [] as unknown as T[keyof T]) as unknown as Arr,
        form.get([schema.name!]) as FormArray,
        schema.schemas,
        false
      );
    }

    let value: unknown;
    // 如果是双字段模式，则需要从模型中分别取得这两个字段的值组为一个元组
    if (isDoubleKeySchemaName(schema.name!)) {
      value = schema.name.map((property, index) => (
        (model as Obj)[property] ?? schema.value?.[index] ?? null
      ));
    } else {
      value = model[schema.name as keyof T] ?? schema.value ?? null;
    }

    if (schema.mapper) {
      value = schema.mapper.input(value);
    } else if (['date', 'time'].includes(schema.type)) {
      value = value ? new Date(value as string | number | Date) : null;
    } else if (schema.type === 'range') {
      value = (value as [string | number | Date, string | number | Date])?.map(o => o ? new Date(o) : null);
    } else if (schema.type === 'checkbox') {
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
 * 通过图示分配表单值到模型
 * @param form
 * @param model
 * @param schemas
 */
export function assignFormToModel<T extends Obj>(form: FormGroup, model: T, schemas: (AnySchema | AnyBuilder)[]): T;
export function assignFormToModel<T extends Arr>(form: FormArray, model: T, schemas: (AnySchema | AnyBuilder)[]): T;
export function assignFormToModel<T extends Obj | Arr>(form: FormGroup | FormArray, model: T, schemas: (AnySchema | AnyBuilder)[]) {
  if (Array.isArray(model)) {
    model.length = 0;
  } else {
    Object.keys(model).forEach(property => delete model[property]);
  }

  standardSchemas(schemas).forEach(schema => {
    if (schema.type === 'input-group') {
      return getFormValueBySchemas(form as FormGroup, schema.schemas, model as Obj);
    }

    const control = form.get([schema.name!.toString()])!;

    if (schema.type === 'group') {
      return assignFormToModel(
        control as FormGroup,
        (model[schema.name as keyof T] ??= ({} as T[keyof T])) as unknown as Obj,
        schema.schemas,
      );
    }

    if (schema.type === 'array') {
      return assignFormToModel(
        control as FormArray,
        (model[schema.name as keyof T] ??= ([] as unknown as T[keyof T])) as unknown as Arr,
        schema.schemas,
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

      value = (value as [Date | null, Date | null])?.map(o => o?.getTime() ?? null);
    } else if (schema.type === 'slider') {
      // 如果是双字段模式，将数组并分别赋值到两个字段中去
      if (isDoubleKeySchemaName(schema.name!)) {
        return schema.name.forEach((property, index) => {
          model[property as keyof T] = (
            (value as [number | null, number | null])?.[index] ?? null
          ) as unknown as T[keyof T];
        });
      }
    } else if (schema.type === 'checkbox') {
      value = (value as NzCheckBoxOptionInterface[])?.filter(o => o.checked).map(o => o.value);
    }

    model[schema.name as keyof T] = value as T[keyof T];
  });

  return model;
}

/**
 * 通过 schemas 来获取表单值
 * @param form
 * @param schemas
 * @param model 函数内部使用的参数，外部调用不需要传
 */
export function getFormValueBySchemas<T extends Obj>(form: FormGroup, schemas: (AnySchema | AnyBuilder)[], model?: T): T
export function getFormValueBySchemas<T extends Arr>(form: FormArray, schemas: (AnySchema | AnyBuilder)[], model?: T): T;
export function getFormValueBySchemas<T extends Obj | Arr>(form: FormGroup | FormArray, schemas: (AnySchema | AnyBuilder)[], model: T = ({} as T)): T {
  standardSchemas(schemas).forEach(schema => {
    if (schema.type === 'input-group') {
      return getFormValueBySchemas(form as FormGroup, schema.schemas, model as Obj);
    }

    const control = form.get([schema.name!.toString()])!;

    if (schema.type === 'group') {
      return getFormValueBySchemas(
        control as FormGroup,
        schema.schemas,
        (model[schema.name as keyof T] ??= ({} as T[keyof T])) as unknown as Obj
      );
    }

    if (schema.type === 'array') {
      return getFormValueBySchemas(
        control as FormArray,
        schema.schemas,
        (model[schema.name as keyof T] ??= ([] as unknown as T[keyof T])) as unknown as Arr
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

      value = (value as [Date | null, Date | null])?.map(o => o?.getTime() ?? null);
    } else if (schema.type === 'slider') {
      // 如果是双字段模式，将数组并分别赋值到两个字段中去
      if (isDoubleKeySchemaName(schema.name!)) {
        return schema.name.forEach((property, index) => {
          model[property as keyof T] = (
            (value as [number | null, number | null])?.[index] ?? null
          ) as unknown as T[keyof T];
        });
      }
    } else if (schema.type === 'checkbox') {
      value = (value as NzCheckBoxOptionInterface[])?.filter(o => o.checked).map(o => o.value);
    }

    model[schema.name as keyof T] = value as T[keyof T];
  });

  return model;
}
