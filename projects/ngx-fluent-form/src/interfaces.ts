import type { QueryList } from '@angular/core';
import { NzFormLayoutType } from 'ng-zorro-antd/form';
import { NzRowDirective } from 'ng-zorro-antd/grid';
import type { FluentTemplateDirective } from './directives';

export interface FluentConfig {
  layout: NzFormLayoutType;
  colon: boolean;
  gutter: NzRowDirective['nzGutter'];
}

export interface DirectiveQueryContainer {
  templateDirectives: QueryList<FluentTemplateDirective>;
}
