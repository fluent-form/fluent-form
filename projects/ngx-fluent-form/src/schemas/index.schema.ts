import { StableBuilder } from '../utils';
import { RowComponentSchema, StepComponentSchema, StepsComponentSchema, TabComponentSchema, TabsComponentSchema } from './component-container.schema';
import { ButtonGroupComponentSchema } from './component-wrapper.schema';
import { ButtonComponentSchema, HeadingComponentSchema, TemplateSchema, TextComponentSchema } from './component.schema';
import { FormArraySchema, FormGroupSchema } from './control-container.schema';
import { InputGroupComponentSchema } from './control-wrapper.schema';
import { CascaderControlSchema, CheckboxControlSchema, CheckboxGroupControlSchema, DatePickerControlSchema, DateRangePickerControlSchema, HeadlessControlSchema, InputControlSchema, NumberInputControlSchema, RadioGroupControlSchema, RateControlSchema, SelectControlSchema, SliderControlSchema, TextareaControlSchema, TimePickerControlSchema, ToggleControlSchema, TreeSelectControlSchema } from './control.schema';
import { AnySchemaKey, DoubleSchemaKey, SchemaKey } from './types';

/** 任意图示 */
export type AnySchema =
  | AnyControlSchema
  | AnyContainerSchema
  | AnyComponentSchema
  | AnyWrapperSchema;
/** 任意构建器 */
export type AnyBuilder = StableBuilder<AnySchema>;

/** 控件或控件容器图示 */
export type AnyControlOrControlContainerSchema = AnyControlContainerSchema | AnyControlSchema;
/** 控件或控件容器构建器 */
export type AnyControlOrControlContainerBuilder = StableBuilder<AnyControlOrControlContainerSchema>;

/** 任意容器图示 */
export type AnyContainerSchema = AnyControlContainerSchema | AnyComponentContainerSchema;
/** 任意容器构建器 */
export type AnyContainerBuilder = StableBuilder<AnyContainerSchema>;

/** 任意包装器图示 */
export type AnyWrapperSchema = AnyControlWrapperSchema | AnyComponentWrapperSchema;
/** 任意包装器构建器 */
export type AnyWrapperBuilder = StableBuilder<AnyWrapperSchema>;

/** 任意控件包装器图示 */
export type AnyControlWrapperSchema<Key extends SchemaKey = SchemaKey> = InputGroupComponentSchema<Key>;
/** 任意控件包装器构建器 */
export type AnyControlWrapperBuilder<Key extends SchemaKey = SchemaKey> = StableBuilder<AnyControlWrapperSchema<Key>>;

/** 任意组件容器图示 */
export type AnyComponentContainerSchema<Key extends SchemaKey = SchemaKey> =
  | StepsComponentSchema<Key>
  | StepComponentSchema<Key>
  | TabsComponentSchema<Key>
  | TabComponentSchema<Key>
  | RowComponentSchema<Key>;
/** 任意组件容器构建器 */
export type AnyComponentContainerBuilder<Key extends SchemaKey = SchemaKey> = StableBuilder<AnyComponentContainerSchema<Key>>;

/** 任意控件容器图示 */
export type AnyControlContainerSchema<Key extends SchemaKey = SchemaKey> = FormGroupSchema<Key> | FormArraySchema<Key>;
/** 任意控件容器构建器 */
export type AnyControlContainerBuilder<Key extends SchemaKey = SchemaKey> = StableBuilder<AnyControlContainerSchema<Key>>;

/** 真实控件图示 */
export type AnyControlSchema = SingleKeyControlSchema | DoubleKeyControlSchema | AnyKeyControlSchema;
/** 真实控件构建器 */
export type AnyControlBuilder = StableBuilder<AnyControlSchema>;

/** 组件容器图示 */
export type AnyComponentWrapperSchema = ButtonGroupComponentSchema;
/** 组件容器构建器 */
export type AnyComponentWrapperBuilder = StableBuilder<AnyComponentWrapperSchema>;

/** 普通组件图示 */
export type AnyComponentSchema<Key extends SchemaKey = SchemaKey> =
  | TemplateSchema<Key>
  | ButtonComponentSchema<Key>
  | TextComponentSchema<Key>
  | HeadingComponentSchema<Key>;
/** 普通组件构建器 */
export type AnyComponentBuilder<Key extends SchemaKey = SchemaKey> = StableBuilder<AnyComponentSchema<Key>>;

/** 可组合组件图示 */
export type ComposableComponentSchema =
  | InputControlSchema
  | TextareaControlSchema
  | NumberInputControlSchema
  | DatePickerControlSchema
  | TimePickerControlSchema
  | DateRangePickerControlSchema
  | SelectControlSchema
  | CascaderControlSchema
  | TreeSelectControlSchema
  | ButtonComponentSchema;
/** 可组合组件构建器 */
export type ComposableComponentBuilder = StableBuilder<ComposableComponentSchema>;

/** 单字段的真实控件图示 */
export type SingleKeyControlSchema<Key extends SchemaKey = SchemaKey> =
  | InputControlSchema<Key>
  | TextareaControlSchema<Key>
  | NumberInputControlSchema<Key>
  | DatePickerControlSchema<Key>
  | TimePickerControlSchema<Key>
  | ToggleControlSchema<Key>
  | SelectControlSchema<Key>
  | CascaderControlSchema<Key>
  | TreeSelectControlSchema<Key>
  | RadioGroupControlSchema<Key>
  | CheckboxControlSchema<Key>
  | CheckboxGroupControlSchema<Key>
  | RateControlSchema<Key>
  | DateRangePickerControlSchema<Key>
  | SliderControlSchema<Key>
  | HeadlessControlSchema<Key>;
/** 单字段的真实控件构建器 */
export type SingleKeyControlBuilder<Key extends SchemaKey = SchemaKey> = StableBuilder<SingleKeyControlSchema<Key>>;

/** 双字段的真实控件图示 */
export type DoubleKeyControlSchema<Key extends DoubleSchemaKey = DoubleSchemaKey> =
  | DateRangePickerControlSchema<Key>
  | SliderControlSchema<Key>;
/** 双字段的真实控件构建器 */
export type DoubleKeyControlBuilder<Key extends DoubleSchemaKey = DoubleSchemaKey> = StableBuilder<DoubleKeyControlSchema<Key>>;

/** 任意键的真实控件图示 */
export type AnyKeyControlSchema<Key extends AnySchemaKey = AnySchemaKey> =
  | DateRangePickerControlSchema<Key>
  | SliderControlSchema<Key>;
/** 任意键的真实控件构建器 */
export type AnyKeyControlBuilder<Key extends AnySchemaKey = AnySchemaKey> = StableBuilder<AnyKeyControlSchema<Key>>;
