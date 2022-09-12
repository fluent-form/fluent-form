import { AnySchemaName, SchemaName } from '../schemas/abstract.schema';
import { CascaderControlSchema, CheckboxControlSchema, CheckboxGroupControlSchema, DatePickerControlSchema, FormArraySchema, FormGroupSchema, InputControlSchema, NumberInputControlSchema, RadioControlSchema, RangePickerControlSchema, RateControlSchema, SelectControlSchema, SliderControlSchema, SwitchControlSchema, TextareaControlSchema, TimePickerControlSchema, TreeSelectControlSchema } from '../schemas/control.schema';
import { AnyBuilder, AnySchema } from '../schemas/index.schema';
import { TypeAndName } from '../types';
import { standardSchema, standardSchemas } from "../utils";
import { builder, UnstableBuilder } from '../utils/builder.utils';

export const form = (...schemas: (AnySchema | AnyBuilder)[]) => standardSchemas(schemas);
export const control = <T extends AnySchema | AnyBuilder>(schema: T) => standardSchema(schema);

export function input(): UnstableBuilder<InputControlSchema<number>, TypeAndName>;
export function input<N extends SchemaName>(name?: N): UnstableBuilder<InputControlSchema<N>, TypeAndName>;
export function input<N extends SchemaName>(name?: N) {
  return builder<InputControlSchema<N>>().type('input').name(name);
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

export function switcher(): UnstableBuilder<SwitchControlSchema<number>, TypeAndName>;
export function switcher<N extends SchemaName>(name?: N): UnstableBuilder<SwitchControlSchema<N>, TypeAndName>;
export function switcher<N extends SchemaName>(name?: N) {
  return builder<SwitchControlSchema<N>>().type('switch').name(name);
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

export function radio(): UnstableBuilder<RadioControlSchema<number>, TypeAndName>;
export function radio<N extends SchemaName>(name?: N): UnstableBuilder<RadioControlSchema<N>, TypeAndName>;
export function radio<N extends SchemaName>(name?: N) {
  return builder<RadioControlSchema<N>>().type('radio').name(name);
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

export function range(): UnstableBuilder<RangePickerControlSchema<number>, TypeAndName>;
export function range<N extends AnySchemaName>(name?: N): UnstableBuilder<RangePickerControlSchema<N>, TypeAndName>;
export function range<N extends AnySchemaName>(name?: N) {
  return builder<RangePickerControlSchema<N>>().type('range').name(name);
}

export function group(): UnstableBuilder<FormGroupSchema<number>, TypeAndName>;
export function group<N extends SchemaName>(name?: N): UnstableBuilder<FormGroupSchema<N>, TypeAndName>;
export function group<N extends SchemaName>(name?: N) {
  return builder<FormGroupSchema<N>>().type('group').name(name);
}

export function array(): UnstableBuilder<FormArraySchema<number>, TypeAndName>;
export function array<N extends SchemaName>(name?: N): UnstableBuilder<FormArraySchema<N>, TypeAndName>;
export function array<N extends SchemaName>(name?: N) {
  return builder<FormArraySchema<N>>().type('array').name(name);
}
