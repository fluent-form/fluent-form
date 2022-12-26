import { AnySchemaName, CascaderControlSchema, CheckboxControlSchema, CheckboxGroupControlSchema, DatePickerControlSchema, DateRangePickerControlSchema, InputControlSchema, NumberInputControlSchema, RadioControlSchema, RateControlSchema, SchemaName, SelectControlSchema, SliderControlSchema, TextareaControlSchema, TimePickerControlSchema, ToggleControlSchema, TreeSelectControlSchema } from '../schemas';
import { KindAndName } from '../types';
import { builder, UnstableBuilder } from '../utils/builder.utils';

export function input(): UnstableBuilder<InputControlSchema<number>, KindAndName>;
export function input<N extends SchemaName>(name?: N): UnstableBuilder<InputControlSchema<N>, KindAndName>;
export function input<N extends SchemaName>(name?: N) {
  return builder<InputControlSchema<N>>().kind('input').name(name);
}

type KindAndNameAndType = KindAndName | 'type';

export function string(): UnstableBuilder<InputControlSchema<number>, KindAndNameAndType>;
export function string<N extends SchemaName>(name?: N): UnstableBuilder<InputControlSchema<N>, KindAndNameAndType>;
export function string<N extends SchemaName>(name?: N) {
  return input(name).type('text');
}

export function email(): UnstableBuilder<InputControlSchema<number>, KindAndNameAndType>;
export function email<N extends SchemaName>(name?: N): UnstableBuilder<InputControlSchema<N>, KindAndNameAndType>;
export function email<N extends SchemaName>(name?: N) {
  return input(name).type('email');
}

export function password(): UnstableBuilder<InputControlSchema<number>, KindAndNameAndType>;
export function password<N extends SchemaName>(name?: N): UnstableBuilder<InputControlSchema<N>, KindAndNameAndType>;
export function password<N extends SchemaName>(name?: N) {
  return input(name).type('password');
}

export function textarea(): UnstableBuilder<TextareaControlSchema<number>, KindAndName>;
export function textarea<N extends SchemaName>(name?: N): UnstableBuilder<TextareaControlSchema<N>, KindAndName>;
export function textarea<N extends SchemaName>(name?: N) {
  return builder<TextareaControlSchema<N>>().kind('textarea').name(name);
}

export function number(): UnstableBuilder<NumberInputControlSchema<number>, KindAndName>;
export function number<N extends SchemaName>(name?: N): UnstableBuilder<NumberInputControlSchema<N>, KindAndName>;
export function number<N extends SchemaName>(name?: N) {
  return builder<NumberInputControlSchema<N>>().kind('number').name(name);
}

export function integer(): UnstableBuilder<NumberInputControlSchema<number>, KindAndName | 'precision'>;
export function integer<N extends SchemaName>(name?: N): UnstableBuilder<NumberInputControlSchema<N>, KindAndName | 'precision'>;
export function integer<N extends SchemaName>(name?: N) {
  return number(name).precision({ value: 0, mode: 'cut' });
}

export function date(): UnstableBuilder<DatePickerControlSchema<number>, KindAndName>;
export function date<N extends SchemaName>(name?: N): UnstableBuilder<DatePickerControlSchema<N>, KindAndName>;
export function date<N extends SchemaName>(name?: N) {
  return builder<DatePickerControlSchema<N>>().kind('date').name(name);
}

type KindAndNameAndTime = KindAndName | 'time';

export function datetime(): UnstableBuilder<DatePickerControlSchema<number>, KindAndNameAndTime>;
export function datetime<N extends SchemaName>(name?: N): UnstableBuilder<DatePickerControlSchema<N>, KindAndNameAndTime>;
export function datetime<N extends SchemaName>(name?: N) {
  return date<N>(name).format('yyyy-MM-dd HH:mm:ss').time(true);
}

export function time(): UnstableBuilder<TimePickerControlSchema<number>, KindAndName>;
export function time<N extends SchemaName>(name?: N): UnstableBuilder<TimePickerControlSchema<N>, KindAndName>;
export function time<N extends SchemaName>(name?: N) {
  return builder<TimePickerControlSchema<N>>().kind('time').name(name);
}

export function toggle(): UnstableBuilder<ToggleControlSchema<number>, KindAndName>;
export function toggle<N extends SchemaName>(name?: N): UnstableBuilder<ToggleControlSchema<N>, KindAndName>;
export function toggle<N extends SchemaName>(name?: N) {
  return builder<ToggleControlSchema<N>>().kind('toggle').name(name);
}

export function select(): UnstableBuilder<SelectControlSchema<number>, KindAndName>;
export function select<N extends SchemaName>(name?: N): UnstableBuilder<SelectControlSchema<N>, KindAndName>;
export function select<N extends SchemaName>(name?: N) {
  return builder<SelectControlSchema<N>>().kind('select').name(name);
}

export function cascader(): UnstableBuilder<CascaderControlSchema<number>, KindAndName>;
export function cascader<N extends SchemaName>(name?: N): UnstableBuilder<CascaderControlSchema<N>, KindAndName>;
export function cascader<N extends SchemaName>(name?: N) {
  return builder<CascaderControlSchema<N>>().kind('cascader').name(name);
}

export function treeSelect(): UnstableBuilder<TreeSelectControlSchema<number>, KindAndName>;
export function treeSelect<N extends SchemaName>(name?: N): UnstableBuilder<TreeSelectControlSchema<N>, KindAndName>;
export function treeSelect<N extends SchemaName>(name?: N) {
  return builder<TreeSelectControlSchema<N>>().kind('tree-select').name(name);
}

export function radioGroup(): UnstableBuilder<RadioControlSchema<number>, KindAndName>;
export function radioGroup<N extends SchemaName>(name?: N): UnstableBuilder<RadioControlSchema<N>, KindAndName>;
export function radioGroup<N extends SchemaName>(name?: N) {
  return builder<RadioControlSchema<N>>().kind('radio-group').name(name);
}

export function checkbox(): UnstableBuilder<CheckboxControlSchema<number>, KindAndName>;
export function checkbox<N extends SchemaName>(name?: N): UnstableBuilder<CheckboxControlSchema<N>, KindAndName>;
export function checkbox<N extends SchemaName>(name?: N) {
  return builder<CheckboxControlSchema<N>>().kind('checkbox').name(name);
}

export function checkboxGroup(): UnstableBuilder<CheckboxGroupControlSchema<number>, KindAndName>;
export function checkboxGroup<N extends SchemaName>(name?: N): UnstableBuilder<CheckboxGroupControlSchema<N>, KindAndName>;
export function checkboxGroup<N extends SchemaName>(name?: N) {
  return builder<CheckboxGroupControlSchema<N>>().kind('checkbox-group').name(name);
}

export function rate(): UnstableBuilder<RateControlSchema<number>, KindAndName>;
export function rate<N extends SchemaName>(name?: N): UnstableBuilder<RateControlSchema<N>, KindAndName>;
export function rate<N extends SchemaName>(name?: N) {
  return builder<RateControlSchema<N>>().kind('rate').name(name);
}

export function slider(): UnstableBuilder<SliderControlSchema<number>, KindAndName>;
export function slider<N extends AnySchemaName>(name?: N): UnstableBuilder<SliderControlSchema<N>, KindAndName>;
export function slider<N extends AnySchemaName>(name?: N) {
  return builder<SliderControlSchema<N>>().kind('slider').name(name);
}

export function dateRange(): UnstableBuilder<DateRangePickerControlSchema<number>, KindAndName>;
export function dateRange<N extends AnySchemaName>(name?: N): UnstableBuilder<DateRangePickerControlSchema<N>, KindAndName>;
export function dateRange<N extends AnySchemaName>(name?: N) {
  return builder<DateRangePickerControlSchema<N>>().kind('date-range').name(name);
}