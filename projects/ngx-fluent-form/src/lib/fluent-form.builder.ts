import { AnyBuilder, AnySchema, AnySchemaName, CascaderControlSchema, CheckboxControlSchema, DatePickerControlSchema, FormArraySchema, FormGroupSchema, InputControlSchema, InputGroupComponentSchema, NumberInputControlSchema, RadioControlSchema, RangePickerControlSchema, RateControlSchema, SelectControlSchema, SingleKeySchemaName, SliderControlSchema, SwitchControlSchema, TextareaControlSchema, TimePickerControlSchema } from './models/schema.model';
import { builder } from './utils/builder.utils';
import { standardSchemas } from './utils/schema.utils';

export const form = (...schemas: (AnySchema | AnyBuilder)[]) => standardSchemas(schemas);

export const input = <N extends SingleKeySchemaName>(name?: N) => builder<InputControlSchema<N>>().type('input').name(name);
export const textarea = <N extends SingleKeySchemaName>(name?: N) => builder<TextareaControlSchema<N>>().type('textarea').name(name);
export const number = <N extends SingleKeySchemaName>(name?: N) => builder<NumberInputControlSchema<N>>().type('number').name(name);
export const date = <N extends SingleKeySchemaName>(name?: N) => builder<DatePickerControlSchema<N>>().type('date').name(name);
export const datetime = <N extends SingleKeySchemaName>(name?: N) => date<N>(name).format('yyyy-MM-dd HH:mm:ss').showTime(true);
export const time = <N extends SingleKeySchemaName>(name?: N) => builder<TimePickerControlSchema<N>>().type('time').name(name);
export const switcher = <N extends SingleKeySchemaName>(name?: N) => builder<SwitchControlSchema<N>>().type('switch').name(name);
export const select = <N extends SingleKeySchemaName>(name?: N) => builder<SelectControlSchema<N>>().type('select').name(name);
export const cascader = <N extends SingleKeySchemaName>(name?: N) => builder<CascaderControlSchema<N>>().type('cascader').name(name);
export const radio = <N extends SingleKeySchemaName>(name?: N) => builder<RadioControlSchema<N>>().type('radio').name(name);
export const checkbox = <N extends SingleKeySchemaName>(name?: N) => builder<CheckboxControlSchema<N>>().type('checkbox').name(name);
export const rate = <N extends SingleKeySchemaName>(name?: N) => builder<RateControlSchema<N>>().type('rate').name(name);

export const slider = <N extends AnySchemaName>(name?: N) => builder<SliderControlSchema<N>>().type('slider').name(name);
export const range = <N extends AnySchemaName>(name?: N) => builder<RangePickerControlSchema<N>>().type('range').name(name);

export const inputGroup = <N extends SingleKeySchemaName>(name?: N) => builder<InputGroupComponentSchema<N>>().type('input-group').name(name);

export const group = <N extends SingleKeySchemaName>(name?: N) => builder<FormGroupSchema<N>>().type('group').name(name);
export const array = <N extends SingleKeySchemaName>(name?: N) => builder<FormArraySchema<N>>().type('array').name(name);
