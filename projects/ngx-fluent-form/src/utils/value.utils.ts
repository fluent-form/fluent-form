import { AbstractControl } from '@angular/forms';
import { NzCheckBoxOptionInterface } from 'ng-zorro-antd/checkbox';
import { ControlSchema } from '../schemas';
import { AnyArray, AnyObject } from '../types';
import { isDoubleKeySchema } from './schema.utils';

export function valueUtils<S extends AnyObject | AnyArray | AbstractControl>(source: S, schema: ControlSchema) {
  return new ValueUtils(source, schema);
}

/**
 * 通过 schema 获取 source 中对应的值，其中 source 可以是模型或控件
 */
export class ValueUtils<S extends AnyObject | AnyArray | AbstractControl> {
  constructor(
    private readonly source: S,
    private readonly schema: ControlSchema
  ) { }

  getValue(): unknown {
    return this.source instanceof AbstractControl ? this.getControlValue() : this.getModelValue();
  }

  /**
   * 从模型中获取对应值
   */
  private getModelValue(): unknown {
    let value: unknown;
    // 如果从模型中读出来的值为 undefined，说明模型中没有写入该值，这里取图示中提供的默认值
    // 如果是双字段模式，则需要从模型中分别取得这两个字段的值组为一个元组
    if (isDoubleKeySchema(this.schema)) {
      value = this.schema.name!.map((name, index) => {
        const val = this.source[name as keyof S];
        return val === undefined ? this.schema.defaultValue?.[index] ?? null : val;
      });
      // 如果数组元素都是 null，那就直接赋值 null
      if ((value as []).every(o => o === null)) {
        value = null;
      }
    } else {
      value = this.source[this.schema.name as keyof S];
      if (value === undefined) {
        value = this.schema.defaultValue ?? null;
      }
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

  /**
   * 从控件中获取对应值
   */
  private getControlValue(): unknown {
    const value = (this.source as AbstractControl).value;

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
