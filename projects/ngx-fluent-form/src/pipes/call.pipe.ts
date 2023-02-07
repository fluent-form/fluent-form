import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import { AbstractSchema, AnySchemaName, CallbackArgs } from '../schemas';
import { isFunction, isString } from '../utils';

const RETURN_STR = 'return ';

@Pipe({
  name: 'call',
  standalone: true
})
export class FluentCallPipe implements PipeTransform {

  transform<T extends [unknown, AbstractSchema<AnySchemaName>, AbstractControl]>(
    value: boolean | ((...args: SafeAny[]) => boolean) | string | undefined,
    ...[model, schema, control]: T
  ): boolean {
    if (isFunction(value)) {
      return value({ model, schema, control });
    }

    if (isString(value)) {
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

  return (ctx: CallbackArgs<AbstractSchema<AnySchemaName>>) => {
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
