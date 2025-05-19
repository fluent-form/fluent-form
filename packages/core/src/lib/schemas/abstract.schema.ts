import { SafeAny } from '@ngify/types';
import { FluentColDirective } from '../directives';
import { Indexable } from '../types';
import { Column } from './grid';
import { HooksHolder } from './hooks';
import { MaybeSchemaReactiveFn, SchemaLike } from './interfaces';
import { SchemaKey } from './types';

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
