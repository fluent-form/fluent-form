import type { Type } from '@angular/core';
import type { WidgetWrapperContext } from '../components';
import type { FluentColDirective, TemplateRefHolder } from '../directives';
import type { Indexable } from '../types';
import type { Column } from './grid';
import type { HooksHolder } from './hooks';
import type { MaybeSchemaReactiveFn, SchemaLike } from './interfaces';
import type { SchemaKey } from './types';

export type WidgetWrapperType = Type<TemplateRefHolder<WidgetWrapperContext>> | string;
export type ClassType = string | string[] | undefined | null;
export type StyleType = Partial<Record<keyof CSSStyleDeclaration | (string & {}), string>> | undefined | null;
export type ElementType = 'host' | 'wrapper';

/**
 * 抽象图示
 */
export interface AbstractSchema<Key extends SchemaKey = SchemaKey> extends SchemaLike<Key>, HooksHolder<AbstractSchema> {
  /* Used to define the width of the control. */
  col?: Column | ReturnType<FluentColDirective['span']>;
  hidden?: MaybeSchemaReactiveFn<AbstractSchema, boolean>;
  class?: ClassType | Partial<Record<ElementType, ClassType>>;
  style?: StyleType | Partial<Record<ElementType, StyleType>>;
  wrappers?: (WidgetWrapperType[] | WidgetWrapperType)[];
}

export interface AbstractBranchSchema<Key extends SchemaKey = SchemaKey> extends AbstractSchema<Key> {
  schemas: Indexable<AbstractSchema>[];
}
