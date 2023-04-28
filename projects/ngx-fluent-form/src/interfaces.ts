import type { QueryList } from '@angular/core';
import type { FluentTemplateDirective } from './directives';

export interface DirectiveQueryContainer {
  templateDirectives: QueryList<FluentTemplateDirective>;
}
