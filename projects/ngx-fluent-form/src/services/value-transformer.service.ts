import { Injectable, inject } from '@angular/core';
import { AnyObject, SafeAny } from '@ngify/types';
import { isFunction, isString } from '../utils';
import { CodeEvaluator } from './evaluator.service';

const RETURN_STR = 'return ';

@Injectable({
  providedIn: 'root'
})
export class ValueTransformer {
  private readonly evaluator = inject(CodeEvaluator, { optional: true });

  transform(value: SafeAny, context: AnyObject = {}): SafeAny {
    if (isFunction(value)) {
      return value(context);
    }

    if (isString(value) && this.evaluator) {
      if (!value.includes(RETURN_STR)) {
        value = RETURN_STR + value;
      }

      return this.evaluator.evaluate(value, context);
    }

    return value;
  }
}
