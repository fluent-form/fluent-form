import { AbstractControl } from '@angular/forms';
import { AnyControlSchema } from '../schemas';
import { AnyArray, AnyObject } from '../types';
import { isUndefined } from './is.utils';
import { isDoubleKeyControlSchema } from './schema.utils';

export function valueUtils<S extends AnyObject | AnyArray | AbstractControl>(source: S, schema: AnyControlSchema) {
  return new ValueUtils(source, schema);
}

/**
 * 通过 schema 获取 source 中对应的值，其中 source 可以是模型或控件
 */
export class ValueUtils<S extends AnyObject | AnyArray | AbstractControl> {
  constructor(
    private readonly source: S,
    private readonly schema: AnyControlSchema
  ) { }

  getValue(): unknown {
    return this.source instanceof AbstractControl ? this.getValueFromControl() : this.getValueFromModel();
  }

  /**
   * 从模型中获取对应值
   */
  private getValueFromModel(): unknown {
    let value: unknown;
    // 如果从模型中读出来的值为 undefined，说明模型中没有写入该值，这里取图示中提供的默认值
    // 如果是双字段模式，则需要从模型中分别取得这两个字段的值组为一个元组
    if (isDoubleKeyControlSchema(this.schema)) {
      value = this.schema.name!.map((name, index) => {
        const val = this.source[name as keyof S];
        return isUndefined(val) ? this.schema.defaultValue?.[index] ?? null : val;
      });
      // 如果数组元素都是 null，那就直接赋值 null
      if ((value as []).every(o => o === null)) {
        value = null;
      }
    } else {
      value = this.source[this.schema.name as keyof S];
      if (isUndefined(value)) {
        value = this.schema.defaultValue ?? null;
      }
    }

    if (this.schema.mapper) {
      return this.schema.mapper.input(value);
    }

    return value;
  }

  /**
   * 从控件中获取对应值
   */
  private getValueFromControl(): unknown {
    const value = (this.source as AbstractControl).value;

    if (this.schema.mapper) {
      return this.schema.mapper.output(value);
    }

    return value;
  }
}
