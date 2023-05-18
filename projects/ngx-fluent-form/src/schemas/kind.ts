import { InputControlSchema, TextareaControlSchema } from './control.schema';
import { AnyComponentContainerSchema, AnyComponentSchema, AnyComponentWrapperSchema, AnyControlContainerSchema, AnyControlWrapperSchema, AnySchema, DoubleKeyControlSchema } from './index.schema';

/** 控件容器图示类型 */
export const CONTROL_CONTAINER_SCHEMA_KINDS = new Set(['group', 'array']);
/** 控件包装器图示类型 */
export const CONTROL_WRAPPER_SCHEMA_KINDS = new Set(['input-group']);
/** 组件容器图示类型 */
export const COMPONENT_CONTAINER_SCHEMA_KINDS = new Set([
  'steps',
  'step',
  'tabs',
  'tab',
  'row'
]);
/** 组件包装器图示类型 */
export const COMPONENT_WRAPPER_SCHEMA_KINDS = new Set(['button-group']);
/** 普通组件图示类型 */
export const COMPONENT_SCHEMA_KINDS = new Set(['button', 'text', 'template']);
/** 文本控件图示类型 */
export const TEXT_CONTROL_SCHEMA_KINDS = new Set(['input', 'textarea']);

/**
 * 是否为控件容器图示
 * @param schema
 */
export function isControlContainerSchema(schema: AnySchema): schema is AnyControlContainerSchema {
  return CONTROL_CONTAINER_SCHEMA_KINDS.has(schema.kind);
}

/**
 * 是否为控件包装器图示
 * @param schema
 */
export function isControlWrapperSchema(schema: AnySchema): schema is AnyControlWrapperSchema {
  return CONTROL_WRAPPER_SCHEMA_KINDS.has(schema.kind);
}

/**
 * 是否为组件容器图示
 * @param schema
 */
export function isComponentContainerSchema(schema: AnySchema): schema is AnyComponentContainerSchema {
  return COMPONENT_CONTAINER_SCHEMA_KINDS.has(schema.kind);
}

/**
 * 是否为组件包装器图示
 * @param schema
 */
export function isComponentWrapperSchema(schema: AnySchema): schema is AnyComponentWrapperSchema {
  return COMPONENT_WRAPPER_SCHEMA_KINDS.has(schema.kind);
}

/**
 * 是否为文本图示
 * @param schema
 */
export function isTextControlSchema(schema: AnySchema): schema is InputControlSchema | TextareaControlSchema {
  return TEXT_CONTROL_SCHEMA_KINDS.has(schema.kind);
}

/**
 * 是否为组件图示
 * @param schema
 */
export function isComponentSchema(schema: AnySchema): schema is AnyComponentSchema {
  return COMPONENT_SCHEMA_KINDS.has(schema.kind);
}

/**
 * 是否为非控件图示
 * @param schema
 */
export function isNonControlSchema(schema: AnySchema): schema is AnyComponentSchema | AnyComponentWrapperSchema {
  return isComponentSchema(schema) || isComponentWrapperSchema(schema);
}

/**
 * 是否为双字段图示
 * @param schema
 */
export function isDoubleKeyControlSchema(schema: AnySchema): schema is DoubleKeyControlSchema {
  return Array.isArray(schema.name);
}
