import { Injectable } from '@angular/core';
import { AnyObject, SafeAny } from '@ngify/types';

const RETURN_STR = 'return ';
const STATIC_EXPRESSION_PATTERN = /^{{.+}}$/;
const WITHOUT_INTERPOLATION_PATTERN = /^{{|}}$/g;

export abstract class CodeEvaluator {
  abstract evaluate(code: string, context: AnyObject): SafeAny;
}

export function isStaticExpression(str: string) {
  return STATIC_EXPRESSION_PATTERN.test(str);
}

/**
 * @internal
 */
@Injectable()
export class DynamicCodeEvaluator implements CodeEvaluator {

  evaluate(code: string, context: AnyObject) {
    code = RETURN_STR + code.replace(WITHOUT_INTERPOLATION_PATTERN, '');

    const fn = new Function('o', `with(o){${code}}`);
    const proxy = new Proxy(Object.freeze(context), {
      // 拦截所有属性，防止到 Proxy 对象以外的作用域链查找。
      has() {
        return true;
      },
      get(target, key, receiver) {
        if (key === Symbol.unscopables) {
          return undefined;
        }
        return Reflect.get(target, key, receiver);
      },
    });

    return fn(proxy);
  }

}
