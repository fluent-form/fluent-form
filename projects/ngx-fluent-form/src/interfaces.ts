import type { QueryList } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { NzFormLayoutType } from 'ng-zorro-antd/form';
import { NzRowDirective } from 'ng-zorro-antd/grid';
import type { FluentTemplateDirective } from './directives';
import { AbstractSchema } from './schemas';
import { SchemaType } from './schemas/interfaces';

export interface FluentConfig {
  layout: NzFormLayoutType;
  colon: boolean;
  gutter: NzRowDirective['nzGutter'];
}

export interface DirectiveQueryContainer {
  templateDirectives: QueryList<FluentTemplateDirective>;
}

export interface SchemaConfig<S extends AbstractSchema> {
  type: SchemaType;
  /** 修补图示，标准化图示时调用 */
  patch?: (schema: S) => S;
  /** 添加图示自带的验证器 */
  validators?: (schema: S) => ValidatorFn[];
}
