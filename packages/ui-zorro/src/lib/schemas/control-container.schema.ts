import { TemplateRef } from '@angular/core';
import { AbstractFormArraySchema, AbstractFormGroupSchema, MaybeSchemaReactiveFn, SingleSchemaKey } from '@fluent-form/core';
import { NzButtonShape, NzButtonSize, NzButtonType } from 'ng-zorro-antd/button';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzFormLayoutType } from 'ng-zorro-antd/form';
import { NzTabPosition } from 'ng-zorro-antd/tabs';
import { CardComponentSchema } from './component-container.schema';
import { Labelful } from './interfaces';

/**
 * @public
 */
export interface FormGroupSchema<Key extends SingleSchemaKey = SingleSchemaKey> extends AbstractFormGroupSchema<Key>, Labelful {
  layout?: NzFormLayoutType;
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
  }
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
