import { Builder } from '../utils/builder.utils';
import { AnySchemaName, DoubleKeySchemaName, SingleKeySchemaName } from './abstract.schema';
import { ButtonComponentSchema, InputGroupComponentSchema } from './component.schema';
import { CascaderControlSchema, CheckboxControlSchema, CheckboxGroupControlSchema, DatePickerControlSchema, FormArraySchema, FormGroupSchema, InputControlSchema, NumberInputControlSchema, RadioControlSchema, RangePickerControlSchema, RateControlSchema, SelectControlSchema, SliderControlSchema, SwitchControlSchema, TextareaControlSchema, TimePickerControlSchema } from './control.schema';

/** 任意图示 */
export type AnySchema = ControlSchema | ContainerSchema | ComponentSchema;
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
export type ComponentSchema<N extends SingleKeySchemaName = SingleKeySchemaName> = ButtonComponentSchema<N>;
/** 普通组件构建器 */
export type ComponentBuilder<N extends SingleKeySchemaName = SingleKeySchemaName> = Builder<ComponentSchema<N>, ComponentSchema<N>, {}>;

/** 可组合组件图示 */
export type ComposableComponentSchema =
  InputControlSchema |
  TextareaControlSchema |
  NumberInputControlSchema |
  DatePickerControlSchema |
  TimePickerControlSchema |
  RangePickerControlSchema |
  SelectControlSchema |
  CascaderControlSchema |
  ButtonComponentSchema;
/** 可组合组件构建器 */
export type ComposableComponentBuilder = Builder<ComposableComponentSchema, ComposableComponentSchema, {}>;

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
  CheckboxGroupControlSchema<N> |
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
