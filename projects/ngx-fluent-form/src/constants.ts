/** 控件容器图示类型 */
export const CONTROL_CONTAINER_SCHEMA_TYPES = [
  'group',
  'array',
  'input-group',
  'steps',
  'step',
  'tabset',
  'tab'
] as const;
/** 文本控件图示类型 */
export const TEXT_CONTROL_SCHEMA_TYPES = ['input', 'textarea'] as const;
/** 组件容器图示类型 */
export const COMPONENT_CONTAINER_SCHEMA_TYPES = ['button-group'] as const;
/** 普通组件图示类型 */
export const COMPONENT_SCHEMA_TYPES = ['button', 'text'] as const;