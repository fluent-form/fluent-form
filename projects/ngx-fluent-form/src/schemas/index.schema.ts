import { StableBuilder } from '../utils';
import { AnySchemaName, DoubleSchemaName, SchemaName } from './abstract.schema';
import { StepComponentSchema, StepsComponentSchema, TabComponentSchema, TabsetComponentSchema } from './component-container.schema';
import { ButtonGroupComponentSchema } from './component-wrapper.schema';
import { ButtonComponentSchema, TextComponentSchema } from './component.schema';
import { FormArraySchema, FormGroupSchema } from './control-container.schema';
import { InputGroupComponentSchema } from './control-wrapper.schema';
import { CascaderControlSchema, CheckboxControlSchema, CheckboxGroupControlSchema, DatePickerControlSchema, DateRangePickerControlSchema, InputControlSchema, NumberInputControlSchema, RadioGroupControlSchema, RateControlSchema, SelectControlSchema, SliderControlSchema, TextareaControlSchema, TimePickerControlSchema, ToggleControlSchema, TreeSelectControlSchema } from './control.schema';

/** 任意图示 */
export type AnySchema = AnyControlSchema | AnyContainerSchema | ComponentSchema;
/** 任意构建器 */
export type AnyBuilder = StableBuilder<AnySchema>;

/** 控件或控件容器图示 */
export type AnyControlOrControlContainerSchema = AnyControlContainerSchema | AnyControlSchema;
/** 控件或控件容器构建器 */
export type AnyControlOrControlContainerBuilder = StableBuilder<AnyControlOrControlContainerSchema>;

/** 任意容器图示 */
export type AnyContainerSchema = ControlContainerSchema | ComponentContainerSchema;
/** 任意容器构建器 */
export type AnyContainerBuilder = StableBuilder<AnyContainerSchema>;

/** 控件容器图示 */
export type ControlContainerSchema =
  | AnyControlContainerSchema
  | InputGroupComponentSchema
  | StepsComponentSchema
  | StepComponentSchema
  | TabsetComponentSchema
  | TabComponentSchema;
/** 控件容器构建器 */
export type ControlContainerBuilder = StableBuilder<ControlContainerSchema>;

/** 表单图示 */
export type AnyControlContainerSchema<N extends SchemaName = SchemaName> = FormGroupSchema<N> | FormArraySchema<N>;
/** 表单构建器 */
export type AnyControlContainerBuilder<N extends SchemaName = SchemaName> = StableBuilder<AnyControlContainerSchema<N>>;

/** 真实控件图示 */
export type AnyControlSchema = SingleKeyControlSchema | DoubleKeyControlSchema | BothKeyControlSchema;
/** 真实控件构建器 */
export type AnyControlBuilder = StableBuilder<AnyControlSchema>;

/** 组件容器图示 */
export type ComponentContainerSchema = ButtonGroupComponentSchema;
/** 组件容器构建器 */
export type ComponentContainerBuilder = StableBuilder<ComponentContainerSchema>;

/** 普通组件图示 */
export type ComponentSchema<N extends SchemaName = SchemaName> = ButtonComponentSchema<N> | TextComponentSchema<N>;
/** 普通组件构建器 */
export type ComponentBuilder<N extends SchemaName = SchemaName> = StableBuilder<ComponentSchema<N>>;

/** 可组合组件图示 */
export type ComposableComponentSchema =
  | InputControlSchema
  | TextareaControlSchema
  | NumberInputControlSchema
  | DatePickerControlSchema
  | TimePickerControlSchema
  | DateRangePickerControlSchema<SchemaName>
  | DateRangePickerControlSchema<DoubleSchemaName>
  | SelectControlSchema
  | CascaderControlSchema
  | TreeSelectControlSchema
  | ButtonComponentSchema;
/** 可组合组件构建器 */
export type ComposableComponentBuilder = StableBuilder<ComposableComponentSchema>;

/** 单字段的真实控件图示 */
export type SingleKeyControlSchema<N extends SchemaName = SchemaName> =
  | InputControlSchema<N>
  | TextareaControlSchema<N>
  | NumberInputControlSchema<N>
  | DatePickerControlSchema<N>
  | TimePickerControlSchema<N>
  | ToggleControlSchema<N>
  | SelectControlSchema<N>
  | CascaderControlSchema<N>
  | TreeSelectControlSchema<N>
  | RadioGroupControlSchema<N>
  | CheckboxControlSchema<N>
  | CheckboxGroupControlSchema<N>
  | RateControlSchema<N>
  | DateRangePickerControlSchema<N>
  | SliderControlSchema<N>;
/** 单字段的真实控件构建器 */
export type SingleKeyControlBuilder<N extends SchemaName = SchemaName> = StableBuilder<SingleKeyControlSchema<N>>;

/** 双字段的真实控件图示 */
export type DoubleKeyControlSchema<N extends DoubleSchemaName = DoubleSchemaName> =
  | DateRangePickerControlSchema<N>
  | SliderControlSchema<N>;
/** 双字段的真实控件构建器 */
export type DoubleKeyControlBuilder<N extends DoubleSchemaName = DoubleSchemaName> = StableBuilder<DoubleKeyControlSchema<N>>;

/** 任意键的真实控件图示 */
export type BothKeyControlSchema<N extends AnySchemaName = AnySchemaName> =
  | DateRangePickerControlSchema<N>
  | SliderControlSchema<N>;
/** 任意键的真实控件构建器 */
export type BothKeyControlBuilder<N extends AnySchemaName = AnySchemaName> = StableBuilder<BothKeyControlSchema<N>>;
