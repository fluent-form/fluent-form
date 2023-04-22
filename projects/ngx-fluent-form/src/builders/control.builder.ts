import { AnyControlSchema, CascaderControlSchema, CheckboxControlSchema, CheckboxGroupControlSchema, DatePickerControlSchema, DateRangePickerControlSchema, InputControlSchema, NoneControlSchema, NumberInputControlSchema, RadioGroupControlSchema, RateControlSchema, SelectControlSchema, SliderControlSchema, TextareaControlSchema, TimePickerControlSchema, ToggleControlSchema, TreeSelectControlSchema } from '../schemas';
import { AnySchemaName, SchemaName } from '../schemas/types';
import { Builder, UnstableBuilder, builder } from '../utils';
import { KindOrName } from './helper';

const REST_PARAMS = ['validators', 'asyncValidators'] as const;

function controlBuilder<T extends AnyControlSchema>(): Builder<T, RestSchema> {
  return builder<T, RestSchema>(REST_PARAMS);
}

export function none<N extends SchemaName>(name?: N): UnstableControlBuilder<NoneControlSchema<N>, KindOrName> {
  return controlBuilder<NoneControlSchema<N>>().kind('none').name(name);
}

export function input(): UnstableControlBuilder<InputControlSchema<number>, KindOrName>;
export function input<N extends SchemaName>(name?: N): UnstableControlBuilder<InputControlSchema<N>, KindOrName>;
export function input<N extends SchemaName>(name?: N) {
  return controlBuilder<InputControlSchema<N>>().kind('input').name(name);
}

export function email(): UnstableControlBuilder<InputControlSchema<number>, KindOrNameOrType>;
export function email<N extends SchemaName>(name?: N): UnstableControlBuilder<InputControlSchema<N>, KindOrNameOrType>;
export function email<N extends SchemaName>(name?: N) {
  return input(name).type('email');
}

export function telephone(): UnstableControlBuilder<InputControlSchema<number>, KindOrNameOrType>;
export function telephone<N extends SchemaName>(name?: N): UnstableControlBuilder<InputControlSchema<N>, KindOrNameOrType>;
export function telephone<N extends SchemaName>(name?: N) {
  return input(name).type('tel');
}

export function url(): UnstableControlBuilder<InputControlSchema<number>, KindOrNameOrType>;
export function url<N extends SchemaName>(name?: N): UnstableControlBuilder<InputControlSchema<N>, KindOrNameOrType>;
export function url<N extends SchemaName>(name?: N) {
  return input(name).type('url');
}

export function password(): UnstableControlBuilder<InputControlSchema<number>, KindOrNameOrType>;
export function password<N extends SchemaName>(name?: N): UnstableControlBuilder<InputControlSchema<N>, KindOrNameOrType>;
export function password<N extends SchemaName>(name?: N) {
  return input(name).type('password');
}

export function textarea(): UnstableControlBuilder<TextareaControlSchema<number>, KindOrName>;
export function textarea<N extends SchemaName>(name?: N): UnstableControlBuilder<TextareaControlSchema<N>, KindOrName>;
export function textarea<N extends SchemaName>(name?: N) {
  return controlBuilder<TextareaControlSchema<N>>().kind('textarea').name(name);
}

export function number(): UnstableControlBuilder<NumberInputControlSchema<number>, KindOrName>;
export function number<N extends SchemaName>(name?: N): UnstableControlBuilder<NumberInputControlSchema<N>, KindOrName>;
export function number<N extends SchemaName>(name?: N) {
  return controlBuilder<NumberInputControlSchema<N>>().kind('number').name(name);
}

export function integer(): UnstableControlBuilder<NumberInputControlSchema<number>, KindOrName | 'precision'>;
export function integer<N extends SchemaName>(name?: N): UnstableControlBuilder<NumberInputControlSchema<N>, KindOrName | 'precision'>;
export function integer<N extends SchemaName>(name?: N) {
  return number(name).precision({ value: 0, mode: 'cut' });
}

export function date(): UnstableControlBuilder<DatePickerControlSchema<number>, KindOrName>;
export function date<N extends SchemaName>(name?: N): UnstableControlBuilder<DatePickerControlSchema<N>, KindOrName>;
export function date<N extends SchemaName>(name?: N) {
  return controlBuilder<DatePickerControlSchema<N>>().kind('date').name(name);
}

export function datetime(): UnstableControlBuilder<DatePickerControlSchema<number>, KindOrName | TimeOrFormat>;
export function datetime<N extends SchemaName>(name?: N): UnstableControlBuilder<DatePickerControlSchema<N>, KindOrName | TimeOrFormat>;
export function datetime<N extends SchemaName>(name?: N) {
  return date<N>(name).format('yyyy-MM-dd HH:mm:ss').time(true);
}

export function time(): UnstableControlBuilder<TimePickerControlSchema<number>, KindOrName>;
export function time<N extends SchemaName>(name?: N): UnstableControlBuilder<TimePickerControlSchema<N>, KindOrName>;
export function time<N extends SchemaName>(name?: N) {
  return controlBuilder<TimePickerControlSchema<N>>().kind('time').name(name);
}

export function toggle(): UnstableControlBuilder<ToggleControlSchema<number>, KindOrName>;
export function toggle<N extends SchemaName>(name?: N): UnstableControlBuilder<ToggleControlSchema<N>, KindOrName>;
export function toggle<N extends SchemaName>(name?: N) {
  return controlBuilder<ToggleControlSchema<N>>().kind('toggle').name(name);
}

export function select(): UnstableControlBuilder<SelectControlSchema<number>, KindOrName>;
export function select<N extends SchemaName>(name?: N): UnstableControlBuilder<SelectControlSchema<N>, KindOrName>;
export function select<N extends SchemaName>(name?: N) {
  return controlBuilder<SelectControlSchema<N>>().kind('select').name(name);
}

export function cascader(): UnstableControlBuilder<CascaderControlSchema<number>, KindOrName>;
export function cascader<N extends SchemaName>(name?: N): UnstableControlBuilder<CascaderControlSchema<N>, KindOrName>;
export function cascader<N extends SchemaName>(name?: N) {
  return controlBuilder<CascaderControlSchema<N>>().kind('cascader').name(name);
}

export function treeSelect(): UnstableControlBuilder<TreeSelectControlSchema<number>, KindOrName>;
export function treeSelect<N extends SchemaName>(name?: N): UnstableControlBuilder<TreeSelectControlSchema<N>, KindOrName>;
export function treeSelect<N extends SchemaName>(name?: N) {
  return controlBuilder<TreeSelectControlSchema<N>>().kind('tree-select').name(name);
}

export function radioGroup(): UnstableControlBuilder<RadioGroupControlSchema<number>, KindOrName>;
export function radioGroup<N extends SchemaName>(name?: N): UnstableControlBuilder<RadioGroupControlSchema<N>, KindOrName>;
export function radioGroup<N extends SchemaName>(name?: N) {
  return controlBuilder<RadioGroupControlSchema<N>>().kind('radio-group').name(name);
}

export function checkbox(): UnstableControlBuilder<CheckboxControlSchema<number>, KindOrName>;
export function checkbox<N extends SchemaName>(name?: N): UnstableControlBuilder<CheckboxControlSchema<N>, KindOrName>;
export function checkbox<N extends SchemaName>(name?: N) {
  return controlBuilder<CheckboxControlSchema<N>>().kind('checkbox').name(name);
}

export function checkboxGroup(): UnstableControlBuilder<CheckboxGroupControlSchema<number>, KindOrName>;
export function checkboxGroup<N extends SchemaName>(name?: N): UnstableControlBuilder<CheckboxGroupControlSchema<N>, KindOrName>;
export function checkboxGroup<N extends SchemaName>(name?: N) {
  return controlBuilder<CheckboxGroupControlSchema<N>>().kind('checkbox-group').name(name);
}

export function rate(): UnstableControlBuilder<RateControlSchema<number>, KindOrName>;
export function rate<N extends SchemaName>(name?: N): UnstableControlBuilder<RateControlSchema<N>, KindOrName>;
export function rate<N extends SchemaName>(name?: N) {
  return controlBuilder<RateControlSchema<N>>().kind('rate').name(name);
}

export function slider(): UnstableControlBuilder<SliderControlSchema<number>, KindOrName>;
export function slider<N extends AnySchemaName>(name?: N): UnstableControlBuilder<SliderControlSchema<N>, KindOrName>;
export function slider<N extends AnySchemaName>(name?: N) {
  return controlBuilder<SliderControlSchema<N>>().kind('slider').name(name);
}

export function dateRange(): UnstableControlBuilder<DateRangePickerControlSchema<number>, KindOrName>;
export function dateRange<N extends AnySchemaName>(name?: N): UnstableControlBuilder<DateRangePickerControlSchema<N>, KindOrName>;
export function dateRange<N extends AnySchemaName>(name?: N) {
  return controlBuilder<DateRangePickerControlSchema<N>>().kind('date-range').name(name);
}

type RestSchema = typeof REST_PARAMS[number];
type KindOrNameOrType = KindOrName | 'type';
type TimeOrFormat = 'time' | 'format';

export type UnstableControlBuilder<T extends AnyControlSchema, S extends keyof T> = UnstableBuilder<T, S, RestSchema>
