import { inject, Injectable } from '@angular/core';
import { AnyObject, SafeAny } from '@ngify/types';
import { isFunction, isString } from '../utils';
import { CodeEvaluator } from './evaluator.service';

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
      return this.evaluator.evaluate(value, context);
    }

    return value;
  }
}
