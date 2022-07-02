import { Builder } from '../utils/builder.utils';
import { AnySchemaName, DoubleKeySchemaName, SingleKeySchemaName } from './abstract.schema';
import { InputGroupComponentSchema } from './component.schema';
import { CascaderControlSchema, CheckboxControlSchema, DatePickerControlSchema, InputControlSchema, NumberInputControlSchema, RadioControlSchema, RangePickerControlSchema, RateControlSchema, SelectControlSchema, SliderControlSchema, SwitchControlSchema, TextareaControlSchema, TimePickerControlSchema } from './control.schema';
import { FormArraySchema, FormGroupSchema } from './form.schema';

/** 任意图示 */
export type AnySchema = FormSchema | ControlSchema | ComponentSchema;
/** 任意构建器 */
export type AnyBuilder = Builder<AnySchema, AnySchema, {}>;

/** 控件图示 */
export type AnyControlSchema = FormSchema | ControlSchema;
/** 控件构建器 */
export type AnyControlBuilder = Builder<AnyControlSchema, AnyControlSchema, {}>;

/** 容器图示 */
export type ContainerSchema = FormSchema | InputGroupComponentSchema;
/** 容器构建器 */
export type ContainerBuilder = Builder<ContainerSchema, ContainerSchema, {}>;

/** 表单图示 */
export type FormSchema<N extends SingleKeySchemaName = SingleKeySchemaName> = FormGroupSchema<N> | FormArraySchema<N>;
/** 表单构建器 */
export type FormBuilder<N extends SingleKeySchemaName = SingleKeySchemaName> = Builder<FormSchema<N>, FormSchema<N>, {}>;

/** 真实控件图示 */
export type ControlSchema = SingleKeyControlSchema | DoubleKeyControlSchema;
/** 真实控件构建器 */
export type ControlBuilder = Builder<ControlSchema, ControlSchema, {}>;

/** 普通组件图示 */
export type ComponentSchema<N extends SingleKeySchemaName = SingleKeySchemaName> = InputGroupComponentSchema<N>;
/** 普通组件构建器 */
export type ComponentBuilder<N extends SingleKeySchemaName = SingleKeySchemaName> = Builder<ComponentSchema<N>, ComponentSchema<N>, {}>;

/** 输入系列控件图示 */
export type InputSeriesControlSchema =
  InputControlSchema |
  TextareaControlSchema |
  NumberInputControlSchema |
  DatePickerControlSchema |
  TimePickerControlSchema |
  RangePickerControlSchema |
  SelectControlSchema |
  CascaderControlSchema;
/** 输入系列控件构建器 */
export type InputSeriesControlBuilder = Builder<InputSeriesControlSchema, InputSeriesControlSchema, {}>;

/** 单字段的真实控件图示 */
export type SingleKeyControlSchema<N extends SingleKeySchemaName = SingleKeySchemaName> =
  InputControlSchema<N> |
  TextareaControlSchema<N> |
  NumberInputControlSchema<N> |
  DatePickerControlSchema<N> |
  TimePickerControlSchema<N> |
  SwitchControlSchema<N> |
  SelectControlSchema<N> |
  CascaderControlSchema<N> |
  RadioControlSchema<N> |
  CheckboxControlSchema<N> |
  RateControlSchema<N> |
  RangePickerControlSchema<N> |
  SliderControlSchema<N>;
/** 单字段的真实控件构建器 */
export type SingleKeyControlBuilder<N extends SingleKeySchemaName = SingleKeySchemaName> = Builder<SingleKeyControlSchema<N>, SingleKeyControlSchema<N>, {}>;

/** 双字段的真实控件图示 */
export type DoubleKeyControlSchema<N extends AnySchemaName = AnySchemaName> =
  RangePickerControlSchema<N> |
  SliderControlSchema<N>;
/** 双字段的真实控件构建器 */
export type DoubleKeyControlBuilder<N extends DoubleKeySchemaName = DoubleKeySchemaName> = Builder<DoubleKeyControlSchema<N>, DoubleKeyControlSchema<N>, {}>;
