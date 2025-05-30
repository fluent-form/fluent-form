import { inject, Injectable } from '@angular/core';
import type { AbstractControl } from '@angular/forms';
import type { AnyArray, AnyObject } from '@ngify/types';
import type { AbstractControlSchema } from '../schemas';
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

  valueOfModel<M extends AnyObject | AnyArray>(model: M, schema: AbstractControlSchema): unknown {
    let value: unknown;
    // If the value read from the model is undefined, it means the model did
    // not provide a value, so take the default value from the schema here.
    // If it is a multi-key schema, the values of these keys need to be retrieved
    // separately from the model and combined into an array.
    if (this.schemaUtil.isMultiKeySchema(schema)) {
      value = (schema.key as string[]).map((key, index) => {
        const val = model[key as keyof M];
        return isUndefined(val) ? schema.defaultValue?.[index] ?? null : val;
      });
      // If all elements in the array are `null`, assign `null` directly.
      if ((value as []).every(o => o === null)) {
        value = null;
      }
    } else if (this.schemaUtil.isPathKeySchema(schema)) {
      const paths = this.schemaUtil.parsePathKey(schema.key as string);
      value = paths.reduce((obj, key) => obj?.[key as keyof M] as M, model);
    } else {
      value = model[schema.key as keyof M];
    }

    if (isUndefined(value)) {
      value = schema.defaultValue ?? null;
    }

    if (schema.mapper) {
      return schema.mapper.parser(value, schema);
    }

    return value;
  }

  valueOfControl(control: AbstractControl, schema: AbstractControlSchema): unknown {
    const value = control.value;

    if (schema.mapper) {
      return schema.mapper.formatter(value, schema);
    }

    return value;
  }
}
