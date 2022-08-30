import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { AbstractSchema, AnySchemaName, CallbackArg } from '../schemas';

const RETURN_STR = 'return ';

@Pipe({
  name: 'call'
})
export class CallPipe implements PipeTransform {

  transform<T extends [unknown, AbstractSchema<AnySchemaName>, AbstractControl]>(
    value: boolean | ((arg: CallbackArg<AbstractSchema<AnySchemaName>>) => boolean) | string | undefined,
    ...[model, schema, control]: T
  ): boolean {
    if (typeof value === 'function') {
      return value({ model, schema, control });
    }

    if (typeof value === 'string') {
      if (!value.includes(RETURN_STR)) {
        value = RETURN_STR + value;
      }

      return compileCode(value)({ model, schema, control });
    }

    return value ?? false;
  }

}

/** @internal */
function compileCode(code: string) {
  code = code.replace(/debugger/g, '');
  const fn = new Function('ctx', `with(ctx){{${code}}}`);

  return (ctx: CallbackArg<AbstractSchema<AnySchemaName>>) => {
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