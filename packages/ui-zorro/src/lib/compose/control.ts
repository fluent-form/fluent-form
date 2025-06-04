import { SchemaKey, SingleSchemaKey, UnstableBuilder, composeBuilder } from '@fluent-form/core';
import {
  CascaderControlSchema,
  CheckboxControlSchema,
  CheckboxGroupControlSchema,
  ColorPickerControlSchema,
  DatePickerControlSchema,
  DateRangePickerControlSchema,
  HeadedControlSchema,
  NumberFieldControlSchema,
  RadioGroupControlSchema,
  RateControlSchema,
  SelectControlSchema,
  SliderControlSchema,
  TextAreaControlSchema,
  TextFieldControlSchema,
  TimePickerControlSchema,
  ToggleControlSchema,
  TransferControlSchema,
  TreeSelectControlSchema
} from '../schemas';
import { KindOrKey } from './helper';

export function headed<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<HeadedControlSchema<Key>, KindOrKey> {
  return composeBuilder<HeadedControlSchema<Key>>().kind('headed').key(key);
}

export function textField(): UnstableBuilder<TextFieldControlSchema<number>, KindOrKey>;
export function textField<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<TextFieldControlSchema<Key>, KindOrKey>;
export function textField<Key extends SingleSchemaKey>(key?: Key) {
  return composeBuilder<TextFieldControlSchema<Key>>().kind('text-field').key(key);
}

export function passwordField(): UnstableBuilder<TextFieldControlSchema<number>, KindOrKeyOrType>;
export function passwordField<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<TextFieldControlSchema<Key>, KindOrKeyOrType>;
export function passwordField<Key extends SingleSchemaKey>(key?: Key) {
  return textField(key).type('password');
}

export function textArea(): UnstableBuilder<TextAreaControlSchema<number>, KindOrKey>;
export function textArea<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<TextAreaControlSchema<Key>, KindOrKey>;
export function textArea<Key extends SingleSchemaKey>(key?: Key) {
  return composeBuilder<TextAreaControlSchema<Key>>().kind('text-area').key(key);
}

export function numberField(): UnstableBuilder<NumberFieldControlSchema<number>, KindOrKey>;
export function numberField<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<NumberFieldControlSchema<Key>, KindOrKey>;
export function numberField<Key extends SingleSchemaKey>(key?: Key) {
  return composeBuilder<NumberFieldControlSchema<Key>>().kind('number-field').key(key);
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

export function transfer(): UnstableBuilder<TransferControlSchema<number>, KindOrKey>;
export function transfer<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<TransferControlSchema<Key>, KindOrKey>;
export function transfer<Key extends SingleSchemaKey>(key?: Key) {
  return composeBuilder<TransferControlSchema<Key>>().kind('transfer').key(key);
}

export function colorPicker(): UnstableBuilder<ColorPickerControlSchema<number>, KindOrKey>;
export function colorPicker<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<ColorPickerControlSchema<Key>, KindOrKey>;
export function colorPicker<Key extends SingleSchemaKey>(key?: Key) {
  return composeBuilder<ColorPickerControlSchema<Key>>().kind('color-picker').key(key);
}

type KindOrKeyOrType = KindOrKey | 'type';
