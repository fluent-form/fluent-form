import { Injectable } from '@angular/core';
import type { AnyObject, SafeAny } from '@ngify/core';

const RETURN_STR = 'return ';
const STATIC_EXPRESSION_PATTERN = /^{{.+}}$/;
const INTERPOLATION_PATTERN = /^{{|}}$/g;

export abstract class CodeEvaluator {
  abstract evaluate(code: string, context: AnyObject): SafeAny;
}

export function isStaticExpression(str: string) {
  return STATIC_EXPRESSION_PATTERN.test(str);
}

@Injectable({ providedIn: 'root' })
export class DynamicCodeEvaluator implements CodeEvaluator {
  evaluate(code: string, context: AnyObject) {
    code = RETURN_STR + code.replace(INTERPOLATION_PATTERN, '');

    // TODO: This doesn't work with `unsafe-eval` enabled in CSP.
    const fn = new Function('o', `with(o){${code}}`);
    const proxy = new Proxy(Object.freeze(context), {
      // Intercept all properties to prevent lookup beyond the `Proxy` object's scope chain.
      has() {
        return true;
      },
      get(target, key, receiver) {
        if (key === Symbol.unscopables) {
          return undefined;
        }
        return Reflect.get(target, key, receiver);
      }
    });

    return fn(proxy);
  }
}
