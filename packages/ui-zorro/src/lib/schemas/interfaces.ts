import { TemplateRef } from '@angular/core';
import { ThemeType } from '@ant-design/icons-angular';
import { AbstractSchema, MaybeSchemaReactiveFn } from '@fluent-form/core';

/** @internal */
export interface Tooltip {
  content: string | TemplateRef<void>;
  icon: string;
}

/** @internal */
export interface Label {
  content?: string;
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24;
  width?: string | number;
  wrap?: boolean;
}

/** 带标签的 */
export interface Labelful {
  label?: MaybeSchemaReactiveFn<AbstractSchema, string | Label | null>;
  tooltip?: string | Tooltip;
}

export interface Icon {
  type: string;
  theme?: ThemeType;
}
