import { inject, Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { AnyArray, AnyObject } from '@ngify/types';
import { AnyControlSchema } from '../schemas';
import { isUndefined } from './is.utils';
import { SchemaUtil } from './schema.utils';

/**
 * @internal
 */
@Injectable({
  providedIn: 'root'
})
export class ValueUtil {
  private readonly schemaUtil = inject(SchemaUtil);

  valueOfModel<M extends AnyObject | AnyArray>(model: M, schema: AnyControlSchema): unknown {
    let value: unknown;
    // 如果从模型中读出来的值为 undefined，说明模型中没有写入该值，这里取图示中提供的默认值
    // 如果是双字段模式，则需要从模型中分别取得这两个字段的值组为一个元组
    if (this.schemaUtil.isDoubleKeyControl(schema)) {
      value = schema.key!.map((key, index) => {
        const val = model[key as keyof M];
        return isUndefined(val) ? schema.defaultValue?.[index] ?? null : val;
      });
      // 如果数组元素都是 null，那就直接赋值 null
      if ((value as []).every(o => o === null)) {
        value = null;
      }
    } else {
      value = model[schema.key as keyof M];
      if (isUndefined(value)) {
        value = schema.defaultValue ?? null;
      }
    }

    if (schema.mapper) {
      return schema.mapper.parser(value);
    }

    return value;
  }

  valueOfControl(control: AbstractControl, schema: AnyControlSchema): unknown {
    const value = control.value;

    if (schema.mapper) {
      return schema.mapper.formatter(value);
    }

    return value;
  }
}
