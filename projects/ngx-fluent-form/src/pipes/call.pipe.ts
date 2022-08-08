import { Pipe, PipeTransform } from '@angular/core';
import { Obj } from '../type';

@Pipe({
  name: 'call'
})
export class CallPipe implements PipeTransform {

  transform<T>(value: boolean | ((model: T) => boolean) | string | undefined, model: T): boolean {
    if (typeof value === 'function') {
      return value(model);
    }

    if (typeof value === 'string') {
      if (!value.includes('return ')) {
        value = 'return ' + value;
      }

      return compileCode(value)({ model });
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
