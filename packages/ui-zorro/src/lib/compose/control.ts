import { SchemaKey, SingleSchemaKey, UnstableBuilder, composeBuilder } from '@fluent-form/core';
import { CascaderControlSchema, CheckboxControlSchema, CheckboxGroupControlSchema, ColorPickerControlSchema, DatePickerControlSchema, DateRangePickerControlSchema, HeadlessControlSchema, NumberControlSchema, RadioGroupControlSchema, RateControlSchema, SelectControlSchema, SliderControlSchema, TextControlSchema, TextareaControlSchema, TimePickerControlSchema, ToggleControlSchema, TreeSelectControlSchema } from '../schemas';
import { KindOrKey } from './helper';

export function headless<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<HeadlessControlSchema<Key>, KindOrKey> {
  return composeBuilder<HeadlessControlSchema<Key>>().kind('headless').key(key);
}

export function text(): UnstableBuilder<TextControlSchema<number>, KindOrKey>;
export function text<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<TextControlSchema<Key>, KindOrKey>;
export function text<Key extends SingleSchemaKey>(key?: Key) {
  return composeBuilder<TextControlSchema<Key>>().kind('text').key(key);
}

export function password(): UnstableBuilder<TextControlSchema<number>, KindOrKeyOrType>;
export function password<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<TextControlSchema<Key>, KindOrKeyOrType>;
export function password<Key extends SingleSchemaKey>(key?: Key) {
  return text(key).type('password');
}

export function textarea(): UnstableBuilder<TextareaControlSchema<number>, KindOrKey>;
export function textarea<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<TextareaControlSchema<Key>, KindOrKey>;
export function textarea<Key extends SingleSchemaKey>(key?: Key) {
  return composeBuilder<TextareaControlSchema<Key>>().kind('textarea').key(key);
}

export function number(): UnstableBuilder<NumberControlSchema<number>, KindOrKey>;
export function number<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<NumberControlSchema<Key>, KindOrKey>;
export function number<Key extends SingleSchemaKey>(key?: Key) {
  return composeBuilder<NumberControlSchema<Key>>().kind('number').key(key);
}

export function datePicker(): UnstableBuilder<DatePickerControlSchema<number>, KindOrKey>;
export function datePicker<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<DatePickerControlSchema<Key>, KindOrKey>;
export function datePicker<Key extends SingleSchemaKey>(key?: Key) {
  return composeBuilder<DatePickerControlSchema<Key>>().kind('date-picker').key(key);
}

export function datetimePicker(): UnstableBuilder<DatePickerControlSchema<number>, KindOrKey | 'time'>;
export function datetimePicker<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<DatePickerControlSchema<Key>, KindOrKey | 'time'>;
export function datetimePicker<Key extends SingleSchemaKey>(key?: Key) {
  return datePicker<Key>(key).time(true);
}

export function timePicker(): UnstableBuilder<TimePickerControlSchema<number>, KindOrKey>;
export function timePicker<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<TimePickerControlSchema<Key>, KindOrKey>;
export function timePicker<Key extends SingleSchemaKey>(key?: Key) {
  return composeBuilder<TimePickerControlSchema<Key>>().kind('time-picker').key(key);
}

export function toggle(): UnstableBuilder<ToggleControlSchema<number>, KindOrKey>;
export function toggle<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<ToggleControlSchema<Key>, KindOrKey>;
export function toggle<Key extends SingleSchemaKey>(key?: Key) {
  return composeBuilder<ToggleControlSchema<Key>>().kind('toggle').key(key);
}

export function select(): UnstableBuilder<SelectControlSchema<number>, KindOrKey>;
export function select<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<SelectControlSchema<Key>, KindOrKey>;
export function select<Key extends SingleSchemaKey>(key?: Key) {
  return composeBuilder<SelectControlSchema<Key>>().kind('select').key(key);
}

export function cascader(): UnstableBuilder<CascaderControlSchema<number>, KindOrKey>;
export function cascader<Key extends SchemaKey>(key?: Key): UnstableBuilder<CascaderControlSchema<Key>, KindOrKey>;
export function cascader<Key extends SchemaKey>(key?: Key) {
  return composeBuilder<CascaderControlSchema<Key>>().kind('cascader').key(key);
}

export function treeSelect(): UnstableBuilder<TreeSelectControlSchema<number>, KindOrKey>;
export function treeSelect<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<TreeSelectControlSchema<Key>, KindOrKey>;
export function treeSelect<Key extends SingleSchemaKey>(key?: Key) {
  return composeBuilder<TreeSelectControlSchema<Key>>().kind('tree-select').key(key);
}

export function radioGroup(): UnstableBuilder<RadioGroupControlSchema<number>, KindOrKey>;
export function radioGroup<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<RadioGroupControlSchema<Key>, KindOrKey>;
export function radioGroup<Key extends SingleSchemaKey>(key?: Key) {
  return composeBuilder<RadioGroupControlSchema<Key>>().kind('radio-group').key(key);
}

export function checkbox(): UnstableBuilder<CheckboxControlSchema<number>, KindOrKey>;
export function checkbox<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<CheckboxControlSchema<Key>, KindOrKey>;
export function checkbox<Key extends SingleSchemaKey>(key?: Key) {
  return composeBuilder<CheckboxControlSchema<Key>>().kind('checkbox').key(key);
}

export function checkboxGroup(): UnstableBuilder<CheckboxGroupControlSchema<number>, KindOrKey>;
export function checkboxGroup<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<CheckboxGroupControlSchema<Key>, KindOrKey>;
export function checkboxGroup<Key extends SingleSchemaKey>(key?: Key) {
  return composeBuilder<CheckboxGroupControlSchema<Key>>().kind('checkbox-group').key(key);
}

export function rate(): UnstableBuilder<RateControlSchema<number>, KindOrKey>;
export function rate<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<RateControlSchema<Key>, KindOrKey>;
export function rate<Key extends SingleSchemaKey>(key?: Key) {
  return composeBuilder<RateControlSchema<Key>>().kind('rate').key(key);
}

export function slider(): UnstableBuilder<SliderControlSchema<number>, KindOrKey>;
export function slider<Key extends SchemaKey>(key?: Key): UnstableBuilder<SliderControlSchema<Key>, KindOrKey>;
export function slider<Key extends SchemaKey>(key?: Key) {
  return composeBuilder<SliderControlSchema<Key>>().kind('slider').key(key);
}

export function dateRangePicker(): UnstableBuilder<DateRangePickerControlSchema<number>, KindOrKey>;
export function dateRangePicker<Key extends SchemaKey>(key?: Key): UnstableBuilder<DateRangePickerControlSchema<Key>, KindOrKey>;
export function dateRangePicker<Key extends SchemaKey>(key?: Key) {
  return composeBuilder<DateRangePickerControlSchema<Key>>().kind('date-range-picker').key(key);
}

export function color(): UnstableBuilder<ColorPickerControlSchema<number>, KindOrKey>;
export function color<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<ColorPickerControlSchema<Key>, KindOrKey>;
export function color<Key extends SingleSchemaKey>(key?: Key) {
  return composeBuilder<ColorPickerControlSchema<Key>>().kind('color').key(key);
}

type KindOrKeyOrType = KindOrKey | 'type';
