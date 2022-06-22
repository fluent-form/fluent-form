import { AnyBuilder, AnySchema, AnySchemaName, CascaderControlSchema, CheckboxControlSchema, DatePickerControlSchema, FormArraySchema, FormGroupSchema, InputControlSchema, InputGroupComponentSchema, NumberInputControlSchema, RadioControlSchema, RangePickerControlSchema, RateControlSchema, SelectControlSchema, SingleKeySchemaName, SliderControlSchema, SwitchControlSchema, TextareaControlSchema, TimePickerControlSchema } from './models/schema.model';
import { builder } from './utils/builder.utils';
import { standardSchemas } from './utils/schema.utils';

export const form = (...schemas: (AnySchema | AnyBuilder)[]) => standardSchemas(schemas);

export const input = (name: SingleKeySchemaName) => builder<InputControlSchema>().type('input').name(name);
export const textarea = (name: SingleKeySchemaName) => builder<TextareaControlSchema>().type('textarea').name(name);
export const number = (name: SingleKeySchemaName) => builder<NumberInputControlSchema>().type('number').name(name);
export const date = (name: SingleKeySchemaName) => builder<DatePickerControlSchema>().type('date').name(name);
export const datetime = (name: SingleKeySchemaName) => date(name).format('yyyy-MM-dd HH:mm:ss').showTime(true);
export const time = (name: SingleKeySchemaName) => builder<TimePickerControlSchema>().type('time').name(name);
export const switcher = (name: SingleKeySchemaName) => builder<SwitchControlSchema>().type('switch').name(name);
export const select = (name: SingleKeySchemaName) => builder<SelectControlSchema>().type('select').name(name);
export const cascader = (name: SingleKeySchemaName) => builder<CascaderControlSchema>().type('cascader').name(name);
export const radio = (name: SingleKeySchemaName) => builder<RadioControlSchema>().type('radio').name(name);
export const checkbox = (name: SingleKeySchemaName) => builder<CheckboxControlSchema>().type('checkbox').name(name);
export const rate = (name: SingleKeySchemaName) => builder<RateControlSchema>().type('rate').name(name);
export const slider = (name: AnySchemaName) => builder<SliderControlSchema>().type('slider').name(name);
export const range = (name: AnySchemaName) => builder<RangePickerControlSchema>().type('range').name(name);

export const inputGroup = (name: string) => builder<InputGroupComponentSchema>().type('input-group').name(name);

export const group = (name: SingleKeySchemaName) => builder<FormGroupSchema>().type('group').name(name);
export const array = (name: SingleKeySchemaName) => builder<FormArraySchema>().type('array').name(name);
