import { Pipe, PipeTransform } from '@angular/core';
import { Obj } from '../type';

const RETURN_STR = 'return ';

@Pipe({
  name: 'call'
})
export class CallPipe implements PipeTransform {

  transform<T>(value: boolean | ((arg: T) => boolean) | string | undefined, arg: T): boolean {
    if (typeof value === 'function') {
      return value(arg);
    }

    if (typeof value === 'string') {
      if (!value.includes(RETURN_STR)) {
        value = RETURN_STR + value;
      }

      return compileCode(value)(arg as Obj);
    }

    return value ?? false;
  }

}

function compileCode(code: string) {
  code = code.replace(/debugger/g, '');
  const fn = new Function('ctx', `with(ctx){{${code}}}`);

  return (ctx: Obj) => {
    const proxy = new Proxy(Object.freeze(ctx), {
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
  };
}
