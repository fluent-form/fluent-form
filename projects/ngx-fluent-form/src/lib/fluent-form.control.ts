import { AnyControlOptions, CascaderControlOptions, CheckboxControlOptions, DatePickerControlOptions, EmbeddedFormOptions, InputControlOptions, NumberInputControlOptions, RadioControlOptions, RangePickerControlOptions, RateControlOptions, SelectControlOptions, SliderControlOptions, SwitchControlOptions, TextareaControlOptions, TimePickerControlOptions } from './fluent-form.interface';

export const form = (...controls: Builder<AnyControlOptions, AnyControlOptions, {}>[]) => (
  controls.map(o => o.build())
);

export const text = (name: string) => builder<InputControlOptions>().type('text').name(name);
export const email = (name: string) => builder<InputControlOptions>().type('email').name(name);
export const password = (name: string) => builder<InputControlOptions>().type('password').name(name);
export const textarea = (name: string) => builder<TextareaControlOptions>().type('textarea').name(name);
export const number = (name: string) => builder<NumberInputControlOptions>().type('number').name(name);
export const date = (name: string) => builder<DatePickerControlOptions>().type('date').name(name);
export const datetime = (name: string) => date(name).format('yyyy-MM-dd HH:mm:ss').showTime(true);
export const range = (name: string | [string, string]) => builder<RangePickerControlOptions>().type('range').name(name);
export const time = (name: string) => builder<TimePickerControlOptions>().type('time').name(name);
export const switcher = (name: string) => builder<SwitchControlOptions>().type('switch').name(name);
export const select = (name: string) => builder<SelectControlOptions>().type('select').name(name);
export const cascader = (name: string) => builder<CascaderControlOptions>().type('cascader').name(name);
export const slider = (name: string | [string, string]) => builder<SliderControlOptions>().type('slider').name(name);
export const radio = (name: string) => builder<RadioControlOptions>().type('radio').name(name);
export const checkbox = (name: string) => builder<CheckboxControlOptions>().type('checkbox').name(name);
export const rate = (name: string) => builder<RateControlOptions>().type('rate').name(name);

export const embed = (name: string) => builder<EmbeddedFormOptions>().type('embed').name(name);

/**
 * @ignore
 */
function builder<T>(): Builder<T> {
  const builder = new Proxy({} as Record<string, unknown>, {
    get(target, prop: string) {
      if ('build' === prop) {
        return () => target;
      }

      return (args: unknown): unknown => {
        target[prop] = args;
        return builder as Builder<T>;
      };
    }
  });

  return builder as Builder<T>;
}

/** T 原型，B 已选，U 未选 */
type Builder<T, B = unknown, U = T> = (B extends T ? Record<'build', () => T> : unknown) & {
  [P in keyof U]-?: (o: U[P]) => Builder<T, B & Record<P, U[P]>, Omit<U, P>>
};
