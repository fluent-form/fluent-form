import { TemplateRef } from '@angular/core';
import { AbstractFormArraySchema, AbstractFormGroupSchema, MaybeSchemaReactiveFn, SingleSchemaKey } from '@fluent-form/core';
import { NzButtonShape, NzButtonSize, NzButtonType } from 'ng-zorro-antd/button';
import { NzSizeLDSType, NzSizeMDSType } from 'ng-zorro-antd/core/types';
import { NzFormLayoutType } from 'ng-zorro-antd/form';
import type { NzTabPosition } from 'ng-zorro-antd/tabs';
import { CardComponentSchema } from './component-container.schema';
import { TableColumnSchema } from './control-wrapper.schema';
import { Labelful } from './interfaces';

/**
 * @public
 */
export interface FormGroupSchema<Key extends SingleSchemaKey = SingleSchemaKey> extends AbstractFormGroupSchema<Key>, Labelful {
  kind: 'group';
  layout?: NzFormLayoutType;
}

export interface TableRowGroupSchema<Key extends SingleSchemaKey = SingleSchemaKey> extends AbstractFormGroupSchema<Key> {
  kind: 'table-row-group';
  schemas: TableColumnSchema[];
}

export interface TableArraySchema<Key extends SingleSchemaKey = SingleSchemaKey> extends AbstractFormArraySchema<Key>, Labelful {
  kind: 'table-array';
  addable?: MaybeSchemaReactiveFn<FormArraySchema, boolean | AddableButton>;
  removable?: boolean;
  orderable?: boolean;
  size?: NzSizeMDSType;
  bordered?: boolean;
  loading?: boolean;
  schemas: TableRowGroupSchema[];
}

/**
 * @public
 */
export interface FormArraySchema<Key extends SingleSchemaKey = SingleSchemaKey> extends AbstractFormArraySchema<Key>, Labelful {
  kind: 'array';
  layout?: NzFormLayoutType;
  addable?: MaybeSchemaReactiveFn<FormArraySchema, boolean | AddableButton>;
  removable?: boolean;
  orderable?: boolean;
}

/**
 * @internal
 */
export interface AddableButton {
  type?: NzButtonType;
  icon?: string;
  content?: string | TemplateRef<void>;
  size?: NzButtonSize;
  disabled?: boolean;
  variants?: {
    shape?: NzButtonShape;
    danger?: boolean;
    ghost?: boolean;
  };
}

/**
 * @public
 */
export interface TabsArraySchema<Key extends SingleSchemaKey = SingleSchemaKey> extends AbstractFormArraySchema<Key>, Labelful {
  kind: 'tabs-array';
  layout?: NzFormLayoutType;
  size?: NzSizeLDSType;
  position?: NzTabPosition;
  gutter?: number;
  centered?: boolean;
  addable?: MaybeSchemaReactiveFn<TabsArraySchema, boolean>;
  removable?: boolean;
  // orderable?: boolean;
}

export interface CardsArraySchema<Key extends SingleSchemaKey = SingleSchemaKey> extends AbstractFormArraySchema<Key>, Labelful {
  kind: 'cards-array';
  layout?: NzFormLayoutType;
  addable?: MaybeSchemaReactiveFn<FormArraySchema, boolean | AddableButton>;
  removable?: boolean;
  orderable?: boolean;
  schemas: CardComponentSchema[];
}
