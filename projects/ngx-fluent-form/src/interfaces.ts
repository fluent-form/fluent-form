import type { QueryList } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
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
