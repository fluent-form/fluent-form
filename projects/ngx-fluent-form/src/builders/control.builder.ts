import { AnyControlSchema, CascaderControlSchema, CheckboxControlSchema, CheckboxGroupControlSchema, DatePickerControlSchema, DateRangePickerControlSchema, HeadlessControlSchema, InputControlSchema, NumberInputControlSchema, RadioGroupControlSchema, RateControlSchema, SelectControlSchema, SliderControlSchema, TextareaControlSchema, TimePickerControlSchema, ToggleControlSchema, TreeSelectControlSchema } from '../schemas';
import { AnySchemaName, SchemaName } from '../schemas/types';
import { Builder, builder, UnstableBuilder } from '../utils';
import { KindOrKey } from './helper';

const REST_PARAMS = ['validators', 'asyncValidators'] as const;

function controlBuilder<T extends AnyControlSchema>(): Builder<T, RestSchema> {
  return builder<T, RestSchema>(REST_PARAMS);
}

export function headless<N extends SchemaName>(key?: N): UnstableControlBuilder<HeadlessControlSchema<N>, KindOrKey> {
  return controlBuilder<HeadlessControlSchema<N>>().kind('headless').key(key);
}

export function input(): UnstableControlBuilder<InputControlSchema<number>, KindOrKey>;
export function input<N extends SchemaName>(key?: N): UnstableControlBuilder<InputControlSchema<N>, KindOrKey>;
export function input<N extends SchemaName>(key?: N) {
  return controlBuilder<InputControlSchema<N>>().kind('input').key(key);
}

export function password(): UnstableControlBuilder<InputControlSchema<number>, KindOrNameOrType>;
export function password<N extends SchemaName>(key?: N): UnstableControlBuilder<InputControlSchema<N>, KindOrNameOrType>;
export function password<N extends SchemaName>(key?: N) {
  return input(key).type('password');
}

export function textarea(): UnstableControlBuilder<TextareaControlSchema<number>, KindOrKey>;
export function textarea<N extends SchemaName>(key?: N): UnstableControlBuilder<TextareaControlSchema<N>, KindOrKey>;
export function textarea<N extends SchemaName>(key?: N) {
  return controlBuilder<TextareaControlSchema<N>>().kind('textarea').key(key);
}

export function number(): UnstableControlBuilder<NumberInputControlSchema<number>, KindOrKey>;
export function number<N extends SchemaName>(key?: N): UnstableControlBuilder<NumberInputControlSchema<N>, KindOrKey>;
export function number<N extends SchemaName>(key?: N) {
  return controlBuilder<NumberInputControlSchema<N>>().kind('number').key(key);
}

export function date(): UnstableControlBuilder<DatePickerControlSchema<number>, KindOrKey>;
export function date<N extends SchemaName>(key?: N): UnstableControlBuilder<DatePickerControlSchema<N>, KindOrKey>;
export function date<N extends SchemaName>(key?: N) {
  return controlBuilder<DatePickerControlSchema<N>>().kind('date').key(key);
}

export function datetime(): UnstableControlBuilder<DatePickerControlSchema<number>, KindOrKey | TimeOrFormat>;
export function datetime<N extends SchemaName>(key?: N): UnstableControlBuilder<DatePickerControlSchema<N>, KindOrKey | TimeOrFormat>;
export function datetime<N extends SchemaName>(key?: N) {
  return date<N>(key).format('yyyy-MM-dd HH:mm:ss').time(true);
}

export function time(): UnstableControlBuilder<TimePickerControlSchema<number>, KindOrKey>;
export function time<N extends SchemaName>(key?: N): UnstableControlBuilder<TimePickerControlSchema<N>, KindOrKey>;
export function time<N extends SchemaName>(key?: N) {
  return controlBuilder<TimePickerControlSchema<N>>().kind('time').key(key);
}

export function toggle(): UnstableControlBuilder<ToggleControlSchema<number>, KindOrKey>;
export function toggle<N extends SchemaName>(key?: N): UnstableControlBuilder<ToggleControlSchema<N>, KindOrKey>;
export function toggle<N extends SchemaName>(key?: N) {
  return controlBuilder<ToggleControlSchema<N>>().kind('toggle').key(key);
}

export function select(): UnstableControlBuilder<SelectControlSchema<number>, KindOrKey>;
export function select<N extends SchemaName>(key?: N): UnstableControlBuilder<SelectControlSchema<N>, KindOrKey>;
export function select<N extends SchemaName>(key?: N) {
  return controlBuilder<SelectControlSchema<N>>().kind('select').key(key);
}

export function cascader(): UnstableControlBuilder<CascaderControlSchema<number>, KindOrKey>;
export function cascader<N extends SchemaName>(key?: N): UnstableControlBuilder<CascaderControlSchema<N>, KindOrKey>;
export function cascader<N extends SchemaName>(key?: N) {
  return controlBuilder<CascaderControlSchema<N>>().kind('cascader').key(key);
}

export function treeSelect(): UnstableControlBuilder<TreeSelectControlSchema<number>, KindOrKey>;
export function treeSelect<N extends SchemaName>(key?: N): UnstableControlBuilder<TreeSelectControlSchema<N>, KindOrKey>;
export function treeSelect<N extends SchemaName>(key?: N) {
  return controlBuilder<TreeSelectControlSchema<N>>().kind('tree-select').key(key);
}

export function radioGroup(): UnstableControlBuilder<RadioGroupControlSchema<number>, KindOrKey>;
export function radioGroup<N extends SchemaName>(key?: N): UnstableControlBuilder<RadioGroupControlSchema<N>, KindOrKey>;
export function radioGroup<N extends SchemaName>(key?: N) {
  return controlBuilder<RadioGroupControlSchema<N>>().kind('radio-group').key(key);
}

export function checkbox(): UnstableControlBuilder<CheckboxControlSchema<number>, KindOrKey>;
export function checkbox<N extends SchemaName>(key?: N): UnstableControlBuilder<CheckboxControlSchema<N>, KindOrKey>;
export function checkbox<N extends SchemaName>(key?: N) {
  return controlBuilder<CheckboxControlSchema<N>>().kind('checkbox').key(key);
}

export function checkboxGroup(): UnstableControlBuilder<CheckboxGroupControlSchema<number>, KindOrKey>;
export function checkboxGroup<N extends SchemaName>(key?: N): UnstableControlBuilder<CheckboxGroupControlSchema<N>, KindOrKey>;
export function checkboxGroup<N extends SchemaName>(key?: N) {
  return controlBuilder<CheckboxGroupControlSchema<N>>().kind('checkbox-group').key(key);
}

export function rate(): UnstableControlBuilder<RateControlSchema<number>, KindOrKey>;
export function rate<N extends SchemaName>(key?: N): UnstableControlBuilder<RateControlSchema<N>, KindOrKey>;
export function rate<N extends SchemaName>(key?: N) {
  return controlBuilder<RateControlSchema<N>>().kind('rate').key(key);
}

export function slider(): UnstableControlBuilder<SliderControlSchema<number>, KindOrKey>;
export function slider<N extends AnySchemaName>(key?: N): UnstableControlBuilder<SliderControlSchema<N>, KindOrKey>;
export function slider<N extends AnySchemaName>(key?: N) {
  return controlBuilder<SliderControlSchema<N>>().kind('slider').key(key);
}

export function dateRange(): UnstableControlBuilder<DateRangePickerControlSchema<number>, KindOrKey>;
export function dateRange<N extends AnySchemaName>(key?: N): UnstableControlBuilder<DateRangePickerControlSchema<N>, KindOrKey>;
export function dateRange<N extends AnySchemaName>(key?: N) {
  return controlBuilder<DateRangePickerControlSchema<N>>().kind('date-range').key(key);
}

type RestSchema = typeof REST_PARAMS[number];
type KindOrNameOrType = KindOrKey | 'type';
type TimeOrFormat = 'time' | 'format';

export type UnstableControlBuilder<T extends AnyControlSchema, S extends keyof T> = UnstableBuilder<T, S, RestSchema>
