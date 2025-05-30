import { inject, Injectable } from '@angular/core';
import type { AnyObject, SafeAny } from '@ngify/types';
import { isFunction, isString } from '../utils';
import { CodeEvaluator, isStaticExpression } from './evaluator.service';

/**
 * @internal
 */
@Injectable({
  providedIn: 'root'
})
export class ValueTransformer {
  private readonly evaluator = inject(CodeEvaluator, { optional: true });

  transform(value: SafeAny, context: AnyObject = {}): SafeAny {
    if (isFunction(value)) {
      return value(context);
    }

    if (isString(value) && this.evaluator && isStaticExpression(value)) {
      return this.evaluator.evaluate(value, context);
    }

    return value;
  }
}
