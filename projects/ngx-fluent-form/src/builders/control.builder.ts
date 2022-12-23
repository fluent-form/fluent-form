import { AnySchemaName, CascaderControlSchema, CheckboxControlSchema, CheckboxGroupControlSchema, DatePickerControlSchema, InputControlSchema, NumberInputControlSchema, RadioControlSchema, RangePickerControlSchema, RateControlSchema, SchemaName, SelectControlSchema, SliderControlSchema, TextareaControlSchema, TimePickerControlSchema, ToggleControlSchema, TreeSelectControlSchema } from '../schemas';
import { TypeAndName } from '../types';
import { builder, UnstableBuilder } from '../utils/builder.utils';

export function input(): UnstableBuilder<InputControlSchema<number>, TypeAndName>;
export function input<N extends SchemaName>(name?: N): UnstableBuilder<InputControlSchema<N>, TypeAndName>;
export function input<N extends SchemaName>(name?: N) {
  return builder<InputControlSchema<N>>().type('input').name(name);
}

export function string(): UnstableBuilder<InputControlSchema<number>, TypeAndName | 'subtype'>;
export function string<N extends SchemaName>(name?: N): UnstableBuilder<InputControlSchema<N>, TypeAndName | 'subtype'>;
export function string<N extends SchemaName>(name?: N) {
  return input(name).subtype('text');
}

export function email(): UnstableBuilder<InputControlSchema<number>, TypeAndName | 'subtype'>;
export function email<N extends SchemaName>(name?: N): UnstableBuilder<InputControlSchema<N>, TypeAndName | 'subtype'>;
export function email<N extends SchemaName>(name?: N) {
  return input(name).subtype('email');
}

export function password(): UnstableBuilder<InputControlSchema<number>, TypeAndName | 'subtype'>;
export function password<N extends SchemaName>(name?: N): UnstableBuilder<InputControlSchema<N>, TypeAndName | 'subtype'>;
export function password<N extends SchemaName>(name?: N) {
  return input(name).subtype('password');
}

export function textarea(): UnstableBuilder<TextareaControlSchema<number>, TypeAndName>;
export function textarea<N extends SchemaName>(name?: N): UnstableBuilder<TextareaControlSchema<N>, TypeAndName>;
export function textarea<N extends SchemaName>(name?: N) {
  return builder<TextareaControlSchema<N>>().type('textarea').name(name);
}

export function number(): UnstableBuilder<NumberInputControlSchema<number>, TypeAndName>;
export function number<N extends SchemaName>(name?: N): UnstableBuilder<NumberInputControlSchema<N>, TypeAndName>;
export function number<N extends SchemaName>(name?: N) {
  return builder<NumberInputControlSchema<N>>().type('number').name(name);
}

export function integer(): UnstableBuilder<NumberInputControlSchema<number>, TypeAndName | 'precision'>;
export function integer<N extends SchemaName>(name?: N): UnstableBuilder<NumberInputControlSchema<N>, TypeAndName | 'precision'>;
export function integer<N extends SchemaName>(name?: N) {
  return number(name).precision({ value: 0, mode: 'cut' });
}

export function date(): UnstableBuilder<DatePickerControlSchema<number>, TypeAndName>;
export function date<N extends SchemaName>(name?: N): UnstableBuilder<DatePickerControlSchema<N>, TypeAndName>;
export function date<N extends SchemaName>(name?: N) {
  return builder<DatePickerControlSchema<N>>().type('date').name(name);
}

type TypeAndNameAndTime = TypeAndName | 'time';

export function datetime(): UnstableBuilder<DatePickerControlSchema<number>, TypeAndNameAndTime>;
export function datetime<N extends SchemaName>(name?: N): UnstableBuilder<DatePickerControlSchema<N>, TypeAndNameAndTime>;
export function datetime<N extends SchemaName>(name?: N) {
  return date<N>(name).format('yyyy-MM-dd HH:mm:ss').time(true);
}

export function time(): UnstableBuilder<TimePickerControlSchema<number>, TypeAndName>;
export function time<N extends SchemaName>(name?: N): UnstableBuilder<TimePickerControlSchema<N>, TypeAndName>;
export function time<N extends SchemaName>(name?: N) {
  return builder<TimePickerControlSchema<N>>().type('time').name(name);
}

export function toggle(): UnstableBuilder<ToggleControlSchema<number>, TypeAndName>;
export function toggle<N extends SchemaName>(name?: N): UnstableBuilder<ToggleControlSchema<N>, TypeAndName>;
export function toggle<N extends SchemaName>(name?: N) {
  return builder<ToggleControlSchema<N>>().type('toggle').name(name);
}

export function select(): UnstableBuilder<SelectControlSchema<number>, TypeAndName>;
export function select<N extends SchemaName>(name?: N): UnstableBuilder<SelectControlSchema<N>, TypeAndName>;
export function select<N extends SchemaName>(name?: N) {
  return builder<SelectControlSchema<N>>().type('select').name(name);
}

export function cascader(): UnstableBuilder<CascaderControlSchema<number>, TypeAndName>;
export function cascader<N extends SchemaName>(name?: N): UnstableBuilder<CascaderControlSchema<N>, TypeAndName>;
export function cascader<N extends SchemaName>(name?: N) {
  return builder<CascaderControlSchema<N>>().type('cascader').name(name);
}

export function treeSelect(): UnstableBuilder<TreeSelectControlSchema<number>, TypeAndName>;
export function treeSelect<N extends SchemaName>(name?: N): UnstableBuilder<TreeSelectControlSchema<N>, TypeAndName>;
export function treeSelect<N extends SchemaName>(name?: N) {
  return builder<TreeSelectControlSchema<N>>().type('tree-select').name(name);
}

export function radioGroup(): UnstableBuilder<RadioControlSchema<number>, TypeAndName>;
export function radioGroup<N extends SchemaName>(name?: N): UnstableBuilder<RadioControlSchema<N>, TypeAndName>;
export function radioGroup<N extends SchemaName>(name?: N) {
  return builder<RadioControlSchema<N>>().type('radio-group').name(name);
}

export function checkbox(): UnstableBuilder<CheckboxControlSchema<number>, TypeAndName>;
export function checkbox<N extends SchemaName>(name?: N): UnstableBuilder<CheckboxControlSchema<N>, TypeAndName>;
export function checkbox<N extends SchemaName>(name?: N) {
  return builder<CheckboxControlSchema<N>>().type('checkbox').name(name);
}

export function checkboxGroup(): UnstableBuilder<CheckboxGroupControlSchema<number>, TypeAndName>;
export function checkboxGroup<N extends SchemaName>(name?: N): UnstableBuilder<CheckboxGroupControlSchema<N>, TypeAndName>;
export function checkboxGroup<N extends SchemaName>(name?: N) {
  return builder<CheckboxGroupControlSchema<N>>().type('checkbox-group').name(name);
}

export function rate(): UnstableBuilder<RateControlSchema<number>, TypeAndName>;
export function rate<N extends SchemaName>(name?: N): UnstableBuilder<RateControlSchema<N>, TypeAndName>;
export function rate<N extends SchemaName>(name?: N) {
  return builder<RateControlSchema<N>>().type('rate').name(name);
}

export function slider(): UnstableBuilder<SliderControlSchema<number>, TypeAndName>;
export function slider<N extends AnySchemaName>(name?: N): UnstableBuilder<SliderControlSchema<N>, TypeAndName>;
export function slider<N extends AnySchemaName>(name?: N) {
  return builder<SliderControlSchema<N>>().type('slider').name(name);
}

export function dateRange(): UnstableBuilder<RangePickerControlSchema<number>, TypeAndName>;
export function dateRange<N extends AnySchemaName>(name?: N): UnstableBuilder<RangePickerControlSchema<N>, TypeAndName>;
export function dateRange<N extends AnySchemaName>(name?: N) {
  return builder<RangePickerControlSchema<N>>().type('date-range').name(name);
}