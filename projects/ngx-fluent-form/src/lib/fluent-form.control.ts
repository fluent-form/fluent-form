import { AnyControlBuilder, AnyControlName, AnyControlSchema, ArraySchema, CascaderControlSchema, CheckboxControlSchema, DatePickerControlSchema, GroupSchema, InputControlSchema, NumberInputControlSchema, RadioControlSchema, RangePickerControlSchema, RateControlSchema, SelectControlSchema, SingleKeyControlName, SliderControlSchema, SwitchControlSchema, TextareaControlSchema, TimePickerControlSchema } from './models/schema.model';
import { builder } from './utils/builder.utils';
import { standardSchemas } from './utils/schema.utils';

export const form = (...schemas: (AnyControlSchema | AnyControlBuilder)[]) => standardSchemas(schemas);

export const text = (name: SingleKeyControlName) => builder<InputControlSchema>().type('text').name(name);
export const email = (name: SingleKeyControlName) => builder<InputControlSchema>().type('email').name(name);
export const password = (name: SingleKeyControlName) => builder<InputControlSchema>().type('password').name(name);
export const textarea = (name: SingleKeyControlName) => builder<TextareaControlSchema>().type('textarea').name(name);
export const number = (name: SingleKeyControlName) => builder<NumberInputControlSchema>().type('number').name(name);
export const date = (name: SingleKeyControlName) => builder<DatePickerControlSchema>().type('date').name(name);
export const datetime = (name: SingleKeyControlName) => date(name).format('yyyy-MM-dd HH:mm:ss').showTime(true);
export const time = (name: SingleKeyControlName) => builder<TimePickerControlSchema>().type('time').name(name);
export const switcher = (name: SingleKeyControlName) => builder<SwitchControlSchema>().type('switch').name(name);
export const select = (name: SingleKeyControlName) => builder<SelectControlSchema>().type('select').name(name);
export const cascader = (name: SingleKeyControlName) => builder<CascaderControlSchema>().type('cascader').name(name);
export const radio = (name: SingleKeyControlName) => builder<RadioControlSchema>().type('radio').name(name);
export const checkbox = (name: SingleKeyControlName) => builder<CheckboxControlSchema>().type('checkbox').name(name);
export const rate = (name: SingleKeyControlName) => builder<RateControlSchema>().type('rate').name(name);
export const slider = (name: AnyControlName) => builder<SliderControlSchema>().type('slider').name(name);
export const range = (name: AnyControlName) => builder<RangePickerControlSchema>().type('range').name(name);

export const group = (name: SingleKeyControlName) => builder<GroupSchema>().type('group').name(name);
export const array = (name: SingleKeyControlName) => builder<ArraySchema>().type('array').name(name);
