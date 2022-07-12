/**
 * 主要分为以下几大图示：
 *
 * - 控件图示（AbstractControl）
 *   - 普通控件图示（FormControl）
 *     - 单字段控件
 *     - 双字段控件
 *   - 表单控件图示（FormGroup/FormArray）
 *
 * - 容器图示（包裹控件或者组件的图示）
 *   - 组件容器图示（组件包裹组件）
 *   - 控件容器图示
 *     - 组件包裹控件（InputGroup...）
 *     - 表单控包裹控件（FormGroup/FormArray）
 *
 * - 普通组件图示（Component）
 *
 * - 可组合图示（可被 InputGroup 包裹）
 */

import { Builder } from '../utils/builder.utils';
import { AnySchemaName, DoubleKeySchemaName, SingleKeySchemaName } from './abstract.schema';
import { ButtonComponentSchema, ButtonGroupComponentSchema, InputGroupComponentSchema } from './component.schema';
import { CascaderControlSchema, CheckboxControlSchema, CheckboxGroupControlSchema, DatePickerControlSchema, FormArraySchema, FormGroupSchema, InputControlSchema, NumberInputControlSchema, RadioControlSchema, RangePickerControlSchema, RateControlSchema, SelectControlSchema, SliderControlSchema, SwitchControlSchema, TextareaControlSchema, TimePickerControlSchema } from './control.schema';

/** 任意图示 */
export type AnySchema = ControlSchema | AnyContainerSchema | ComponentSchema;
/** 任意构建器 */
export type AnyBuilder = Builder<AnySchema, AnySchema, {}>;

/** 控件图示 */
export type AnyControlSchema = FormSchema | ControlSchema;
/** 控件构建器 */
export type AnyControlBuilder = Builder<AnyControlSchema, AnyControlSchema, {}>;

/** 任意容器图示 */
export type AnyContainerSchema = ControlContainerSchema | ComponentContainerSchema;
/** 任意容器构建器 */
export type AnyContainerBuilder = Builder<AnyContainerSchema, AnyContainerSchema, {}>;

/** 控件容器图示 */
export type ControlContainerSchema = FormSchema | InputGroupComponentSchema;
/** 控件容器构建器 */
export type ControlContainerBuilder = Builder<ControlContainerSchema, ControlContainerSchema, {}>;

/** 表单图示 */
export type FormSchema<N extends SingleKeySchemaName = SingleKeySchemaName> = FormGroupSchema<N> | FormArraySchema<N>;
/** 表单构建器 */
export type FormBuilder<N extends SingleKeySchemaName = SingleKeySchemaName> = Builder<FormSchema<N>, FormSchema<N>, {}>;

/** 真实控件图示 */
export type ControlSchema = SingleKeyControlSchema | DoubleKeyControlSchema;
/** 真实控件构建器 */
export type ControlBuilder = Builder<ControlSchema, ControlSchema, {}>;

/** 组件容器图示 */
export type ComponentContainerSchema = ButtonGroupComponentSchema;
/** 组件容器构建器 */
export type ComponentContainerBuilder = Builder<ComponentContainerSchema, ComponentContainerSchema, {}>;

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
