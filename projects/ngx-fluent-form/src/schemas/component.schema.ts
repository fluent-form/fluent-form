import { TemplateRef } from '@angular/core';
import { AbstractSchema, SingleKeySchemaName } from './abstract.schema';
import { ComposableComponentBuilder, ComposableComponentSchema } from './index.schema';

export interface InputGroupComponentSchema<N extends SingleKeySchemaName = SingleKeySchemaName> extends AbstractSchema<N> {
  type: 'input-group';
  schemas: (ComposableComponentSchema | ComposableComponentBuilder)[];
  required?: boolean;
  /** The pre-label of the input box */
  before?: {
    icon?: string,
    template?: string | TemplateRef<void>
  };
  /** The back label of the input box */
  after?: {
    icon?: string,
    template?: string | TemplateRef<void>
  };
  /** The prefix of the input box */
  prefix?: string | TemplateRef<void>;
  /** The suffix of the input box */
  suffix?: string | TemplateRef<void>;
}