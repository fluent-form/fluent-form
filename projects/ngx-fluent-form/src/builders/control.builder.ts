import { AnyControlSchema, AnySchemaKey, CascaderControlSchema, CheckboxControlSchema, CheckboxGroupControlSchema, DatePickerControlSchema, DateRangePickerControlSchema, HeadlessControlSchema, InputControlSchema, NumberInputControlSchema, RadioGroupControlSchema, RateControlSchema, SchemaKey, SelectControlSchema, SliderControlSchema, TextareaControlSchema, TimePickerControlSchema, ToggleControlSchema, TreeSelectControlSchema } from '../schemas';
import { Builder, builder, UnstableBuilder } from '../utils';
import { KindOrKey } from './helper';

const REST_PARAMS = ['validators', 'asyncValidators'] as const;

function controlBuilder<T extends AnyControlSchema>(): Builder<T, RestSchema> {
  return builder<T, RestSchema>(REST_PARAMS);
}

export function headless<Key extends SchemaKey>(key?: Key): UnstableControlBuilder<HeadlessControlSchema<Key>, KindOrKey> {
  return controlBuilder<HeadlessControlSchema<Key>>().kind('headless').key(key);
}

export function input(): UnstableControlBuilder<InputControlSchema<number>, KindOrKey>;
export function input<Key extends SchemaKey>(key?: Key): UnstableControlBuilder<InputControlSchema<Key>, KindOrKey>;
export function input<Key extends SchemaKey>(key?: Key) {
  return controlBuilder<InputControlSchema<Key>>().kind('input').key(key);
}

export function password(): UnstableControlBuilder<InputControlSchema<number>, KindOrKeyOrType>;
export function password<Key extends SchemaKey>(key?: Key): UnstableControlBuilder<InputControlSchema<Key>, KindOrKeyOrType>;
export function password<Key extends SchemaKey>(key?: Key) {
  return input(key).type('password');
}

export function textarea(): UnstableControlBuilder<TextareaControlSchema<number>, KindOrKey>;
export function textarea<Key extends SchemaKey>(key?: Key): UnstableControlBuilder<TextareaControlSchema<Key>, KindOrKey>;
export function textarea<Key extends SchemaKey>(key?: Key) {
  return controlBuilder<TextareaControlSchema<Key>>().kind('textarea').key(key);
}

export function number(): UnstableControlBuilder<NumberInputControlSchema<number>, KindOrKey>;
export function number<Key extends SchemaKey>(key?: Key): UnstableControlBuilder<NumberInputControlSchema<Key>, KindOrKey>;
export function number<Key extends SchemaKey>(key?: Key) {
  return controlBuilder<NumberInputControlSchema<Key>>().kind('number').key(key);
}

export function date(): UnstableControlBuilder<DatePickerControlSchema<number>, KindOrKey>;
export function date<Key extends SchemaKey>(key?: Key): UnstableControlBuilder<DatePickerControlSchema<Key>, KindOrKey>;
export function date<Key extends SchemaKey>(key?: Key) {
  return controlBuilder<DatePickerControlSchema<Key>>().kind('date').key(key);
}

export function datetime(): UnstableControlBuilder<DatePickerControlSchema<number>, KindOrKey | TimeOrFormat>;
export function datetime<Key extends SchemaKey>(key?: Key): UnstableControlBuilder<DatePickerControlSchema<Key>, KindOrKey | TimeOrFormat>;
export function datetime<Key extends SchemaKey>(key?: Key) {
  return date<Key>(key).format('yyyy-MM-dd HH:mm:ss').time(true);
}

export function time(): UnstableControlBuilder<TimePickerControlSchema<number>, KindOrKey>;
export function time<Key extends SchemaKey>(key?: Key): UnstableControlBuilder<TimePickerControlSchema<Key>, KindOrKey>;
export function time<Key extends SchemaKey>(key?: Key) {
  return controlBuilder<TimePickerControlSchema<Key>>().kind('time').key(key);
}

export function toggle(): UnstableControlBuilder<ToggleControlSchema<number>, KindOrKey>;
export function toggle<Key extends SchemaKey>(key?: Key): UnstableControlBuilder<ToggleControlSchema<Key>, KindOrKey>;
export function toggle<Key extends SchemaKey>(key?: Key) {
  return controlBuilder<ToggleControlSchema<Key>>().kind('toggle').key(key);
}

export function select(): UnstableControlBuilder<SelectControlSchema<number>, KindOrKey>;
export function select<Key extends SchemaKey>(key?: Key): UnstableControlBuilder<SelectControlSchema<Key>, KindOrKey>;
export function select<Key extends SchemaKey>(key?: Key) {
  return controlBuilder<SelectControlSchema<Key>>().kind('select').key(key);
}

export function cascader(): UnstableControlBuilder<CascaderControlSchema<number>, KindOrKey>;
export function cascader<Key extends SchemaKey>(key?: Key): UnstableControlBuilder<CascaderControlSchema<Key>, KindOrKey>;
export function cascader<Key extends SchemaKey>(key?: Key) {
  return controlBuilder<CascaderControlSchema<Key>>().kind('cascader').key(key);
}

export function treeSelect(): UnstableControlBuilder<TreeSelectControlSchema<number>, KindOrKey>;
export function treeSelect<Key extends SchemaKey>(key?: Key): UnstableControlBuilder<TreeSelectControlSchema<Key>, KindOrKey>;
export function treeSelect<Key extends SchemaKey>(key?: Key) {
  return controlBuilder<TreeSelectControlSchema<Key>>().kind('tree-select').key(key);
}

export function radioGroup(): UnstableControlBuilder<RadioGroupControlSchema<number>, KindOrKey>;
export function radioGroup<Key extends SchemaKey>(key?: Key): UnstableControlBuilder<RadioGroupControlSchema<Key>, KindOrKey>;
export function radioGroup<Key extends SchemaKey>(key?: Key) {
  return controlBuilder<RadioGroupControlSchema<Key>>().kind('radio-group').key(key);
}

export function checkbox(): UnstableControlBuilder<CheckboxControlSchema<number>, KindOrKey>;
export function checkbox<Key extends SchemaKey>(key?: Key): UnstableControlBuilder<CheckboxControlSchema<Key>, KindOrKey>;
export function checkbox<Key extends SchemaKey>(key?: Key) {
  return controlBuilder<CheckboxControlSchema<Key>>().kind('checkbox').key(key);
}

export function checkboxGroup(): UnstableControlBuilder<CheckboxGroupControlSchema<number>, KindOrKey>;
export function checkboxGroup<Key extends SchemaKey>(key?: Key): UnstableControlBuilder<CheckboxGroupControlSchema<Key>, KindOrKey>;
export function checkboxGroup<Key extends SchemaKey>(key?: Key) {
  return controlBuilder<CheckboxGroupControlSchema<Key>>().kind('checkbox-group').key(key);
}

export function rate(): UnstableControlBuilder<RateControlSchema<number>, KindOrKey>;
export function rate<Key extends SchemaKey>(key?: Key): UnstableControlBuilder<RateControlSchema<Key>, KindOrKey>;
export function rate<Key extends SchemaKey>(key?: Key) {
  return controlBuilder<RateControlSchema<Key>>().kind('rate').key(key);
}

export function slider(): UnstableControlBuilder<SliderControlSchema<number>, KindOrKey>;
export function slider<Key extends AnySchemaKey>(key?: Key): UnstableControlBuilder<SliderControlSchema<Key>, KindOrKey>;
export function slider<Key extends AnySchemaKey>(key?: Key) {
  return controlBuilder<SliderControlSchema<Key>>().kind('slider').key(key);
}

export function dateRange(): UnstableControlBuilder<DateRangePickerControlSchema<number>, KindOrKey>;
export function dateRange<Key extends AnySchemaKey>(key?: Key): UnstableControlBuilder<DateRangePickerControlSchema<Key>, KindOrKey>;
export function dateRange<Key extends AnySchemaKey>(key?: Key) {
  return controlBuilder<DateRangePickerControlSchema<Key>>().kind('date-range').key(key);
}

type RestSchema = typeof REST_PARAMS[number];
type KindOrKeyOrType = KindOrKey | 'type';
type TimeOrFormat = 'time' | 'format';

export type UnstableControlBuilder<T extends AnyControlSchema, S extends keyof T> = UnstableBuilder<T, S, RestSchema>
