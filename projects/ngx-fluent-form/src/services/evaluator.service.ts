import { Injectable } from '@angular/core';
import { AnyObject, SafeAny } from '@ngify/types';

export abstract class CodeEvaluator {
  abstract evaluate(code: string, context: AnyObject): SafeAny;
}

const RETURN_STR = 'return ';

@Injectable()
export class DynamicCodeEvaluator implements CodeEvaluator {

  evaluate(code: string, context: AnyObject) {
    if (!code.includes(RETURN_STR)) {
      code = RETURN_STR + code;
    }

    const fn = new Function('ctx', `with(ctx){${code}}`);
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
