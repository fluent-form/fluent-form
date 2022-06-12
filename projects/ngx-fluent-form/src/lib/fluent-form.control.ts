import { ArraySchema, CascaderControlSchema, CheckboxControlSchema, ControlName, DatePickerControlSchema, GroupSchema, InputControlSchema, NumberInputControlSchema, RadioControlSchema, RangePickerControlSchema, RateControlSchema, SelectControlSchema, SliderControlSchema, SwitchControlSchema, TextareaControlSchema, TimePickerControlSchema } from './models/schema.model';
import { builder } from './utils/builder.utils';

export const text = (name: string | number) => builder<InputControlSchema>().type('text').name(name);
export const email = (name: string | number) => builder<InputControlSchema>().type('email').name(name);
export const password = (name: string | number) => builder<InputControlSchema>().type('password').name(name);
export const textarea = (name: string | number) => builder<TextareaControlSchema>().type('textarea').name(name);
export const number = (name: string | number) => builder<NumberInputControlSchema>().type('number').name(name);
export const date = (name: string | number) => builder<DatePickerControlSchema>().type('date').name(name);
export const datetime = (name: string | number) => date(name).format('yyyy-MM-dd HH:mm:ss').showTime(true);
export const time = (name: string | number) => builder<TimePickerControlSchema>().type('time').name(name);
export const switcher = (name: string | number) => builder<SwitchControlSchema>().type('switch').name(name);
export const select = (name: string | number) => builder<SelectControlSchema>().type('select').name(name);
export const cascader = (name: string | number) => builder<CascaderControlSchema>().type('cascader').name(name);
export const radio = (name: string | number) => builder<RadioControlSchema>().type('radio').name(name);
export const checkbox = (name: string | number) => builder<CheckboxControlSchema>().type('checkbox').name(name);
export const rate = (name: string | number) => builder<RateControlSchema>().type('rate').name(name);
export const slider = (name: ControlName) => builder<SliderControlSchema>().type('slider').name(name);
export const range = (name: ControlName) => builder<RangePickerControlSchema>().type('range').name(name);

export const group = (name: string | number) => builder<GroupSchema>().type('group').name(name);
export const array = (name: string | number) => builder<ArraySchema>().type('array').name(name);
