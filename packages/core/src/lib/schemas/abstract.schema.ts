import type { SafeAny } from '@ngify/types';
import type { FluentColDirective } from '../directives';
import type { Indexable } from '../types';
import type { Column } from './grid';
import type { HooksHolder } from './hooks';
import type { MaybeSchemaReactiveFn, SchemaLike } from './interfaces';
import type { SchemaKey } from './types';

/**
 * 抽象图示
 */
export interface AbstractSchema<Key extends SchemaKey = SchemaKey> extends SchemaLike<Key>, HooksHolder<AbstractSchema> {
  /* Used to define the width of the control. */
  col?: Column | ReturnType<FluentColDirective['span']>;
  hidden?: MaybeSchemaReactiveFn<AbstractSchema, boolean>;
  class?: null | string | string[] | { [className: string]: boolean | undefined | null };
  style?: string | undefined | null | { [styleName: string]: SafeAny };
}

export interface AbstractBranchSchema<Key extends SchemaKey = SchemaKey> extends AbstractSchema<Key> {
  schemas: Indexable<AbstractSchema>[];
}
