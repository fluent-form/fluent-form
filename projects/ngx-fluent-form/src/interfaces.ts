import type { QueryList } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import type { FluentTemplateDirective } from './directives';
import { AbstractSchema } from './schemas';
import { SchemaType } from './schemas/interfaces';

export interface TemplateDirectiveContainer {
  templateDirectives: QueryList<FluentTemplateDirective>;
}

export interface SchemaConfig<S extends AbstractSchema> {
  type: SchemaType;
  /** 添加图示自带的验证器 */
  validators?: (schema: S) => ValidatorFn[];
}

export type SchemaSelector = '*' | string | string[] | SchemaType;

export type SchemaPatchFn<S extends AbstractSchema> = (schema: S & Record<string, SafeAny>) => S;

export interface SchemaPatcher<S extends AbstractSchema = AbstractSchema> {
  selector: SchemaSelector;
  patch: SchemaPatchFn<S>;
}
